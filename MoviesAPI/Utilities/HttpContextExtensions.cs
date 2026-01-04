using Microsoft.EntityFrameworkCore;

namespace MoviesAPI.Utilities

{
  /// <summary>
  /// Clase estática que extiende HttpContext con métodos adicionales para paginación
  /// Las extension methods permiten agregar funcionalidad a clases existentes sin modificarlas
  /// </summary>
  public static class HttpContextExtensions
  {
        /// <summary>
        /// Método de extensión asíncrono que inserta información de paginación en los headers HTTP
        /// </summary>
        /// <typeparam name="T">Tipo genérico - puede ser cualquier entidad (Genre, Movie, etc.)</typeparam>
        /// <param name="httpContext">El contexto HTTP actual de la petición - contiene request, response, headers, etc.</param>
        /// <param name="queryable">Query LINQ que aún no se ha ejecutado - permite hacer COUNT sin traer todos los datos</param>
        /// <returns>Task - equivalente a void pero para métodos async (representa una operación asíncrona sin valor de retorno)</returns>
        public async static Task InsertPaginationParametersInResponseHeaders<T>(this HttpContext httpContext, IQueryable<T> queryable)
        {
            // Validación defensiva - si httpContext es null, lanza excepción
            // Esto previene errores de NullReferenceException más adelante
            if (httpContext is null)
            {
                throw new ArgumentNullException(nameof(httpContext));
            }

            // CountAsync() ejecuta "SELECT COUNT(*) FROM tabla" en la base de datos
            // Es async porque la consulta a BD puede tardar tiempo
            // IQueryable permite que EF Core optimice la query - solo cuenta, no trae datos
            double count = await queryable.CountAsync();

            // Agrega un header HTTP personalizado a la respuesta
            // El cliente podrá leer este header para saber el total de registros
            // Ejemplo: "total-records-count: 1250"
            httpContext.Response.Headers.Append("total-records-count", count.ToString());
        }
  }  
}