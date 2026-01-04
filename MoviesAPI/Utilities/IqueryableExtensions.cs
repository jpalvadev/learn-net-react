using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using System.Reflection;

namespace MoviesAPI.Utilities
{
    public static class IqueryableExtensions
    {
        public static async Task<IQueryable<T>> PaginateAndFilter<T>(
            this IQueryable<T> queryable,
            PaginationAndFilterDTO paginationDTO,
            HttpContext httpContext) 
        {
            // 1. Obtenemos todos los parámetros de la URL
            var queryParams = httpContext.Request.Query;
            var ignore = new[] { "pageIndex", "pageSize", "sortBy" };

            foreach (var param in queryParams)
            {
                // Si es un parámetro de paginación, lo salteamos
                if (ignore.Contains(param.Key, StringComparer.OrdinalIgnoreCase)) continue;

                var nombrePropiedad = param.Key; // Ej: "name"
                var valorFiltro = param.Value.ToString(); // Ej: "dr"

                if (string.IsNullOrWhiteSpace(valorFiltro)) continue;

                // 2. Buscamos si esa clave existe como columna en la tabla (Genre)
                var propEntidad = typeof(T).GetProperty(nombrePropiedad,
                    BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

                // Si nos pa
                if (propEntidad == null)
                {
                    System.Diagnostics.Trace.WriteLine($"[!] Ignorado: '{nombrePropiedad}' no existe en {typeof(T).Name}");
                    continue;
                }

                // 3. Aplicamos el filtro usando el nombre real de la DB (PascalCase)
                var nombreRealDB = propEntidad.Name;
                System.Diagnostics.Trace.WriteLine($"[FILTRANDO] {nombreRealDB} contiene '{valorFiltro}'");

                if (propEntidad.PropertyType == typeof(string))
                {
                    queryable = queryable.Where(x => EF.Property<string>(x!, nombreRealDB).Contains(valorFiltro));
                }
                else
                {
                    queryable = queryable.Where(x => EF.Property<object>(x!, nombreRealDB).ToString() == valorFiltro);
                }
            }

            // COUNT después del filter (obtenemos la cantidad correcta) de records
            double count = await queryable.CountAsync();
            // va pal header
            httpContext.Response.Headers.Append("total-records-count", count.ToString());

            // 2. Sorting
            if (!string.IsNullOrEmpty(paginationDTO.SortBy))
            {
                var parts = paginationDTO.SortBy.Split('.');

                // IMPORTANTE: Buscamos la propiedad para obtener el nombre real con Mayúscula
                var propSort = typeof(T).GetProperty(parts[0], BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

                if (propSort != null)
                {
                    var realName = propSort.Name; // Esto convierte "name" en "Name"
                    bool desc = parts.Length > 1 && parts[1].ToLower() == "desc";

                    queryable = desc
                        ? queryable.OrderByDescending(x => EF.Property<object>(x!, realName))
                        : queryable.OrderBy(x => EF.Property<object>(x!, realName));
                }
            }


            // 3. Paginacion 
            return queryable
                .Skip((paginationDTO.PageIndex ) * paginationDTO.PageSize)
                .Take(paginationDTO.PageSize);
        }
    }
}