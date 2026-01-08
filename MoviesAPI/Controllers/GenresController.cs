using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using MoviesAPI.Entities;
using MoviesAPI.DTOs;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using MoviesAPI.Utilities;

namespace MoviesAPI.Controllers
{
  [Route("api/v1/genres")]
  [ApiController] // Si el model es invalido (en un POST por ej), devuelve error automaticamente
  public class GenresController: ControllerBase // ControllerBase tiene varios helper methods, como NotFound()
  {

    private readonly IOutputCacheStore outputCacheStore;
    private readonly ApplicationDbContext context;
    private readonly IMapper mapper;
    private const string cacheTag = "genres";

    public GenresController(IOutputCacheStore outputCacheStore, ApplicationDbContext context, IMapper mapper)
    {
      this.outputCacheStore = outputCacheStore;
      this.context = context;
      this.mapper = mapper;
    }

       

        [HttpGet]
        [OutputCache(Tags = [cacheTag])]
        public async Task<List<GenreDTO>> Get([FromQuery] PaginationAndFilterDTO paginationDTO)
        {
            var queryable = context.Genres.AsQueryable();

            // metodo aplica: filter -> count -> count en el header -> paginacion. AWAIT!
            var queryFinal = await queryable.PaginateAndFilter(paginationDTO, HttpContext);

            return await queryFinal
                .ProjectTo<GenreDTO>(mapper.ConfigurationProvider)
                .ToListAsync();
        }



        [HttpGet("{id:int}", Name = "GetGenreById")]
        [OutputCache(Tags = [cacheTag])] //una vez seteado y activado el uso de cache en Program.cs, lo usamos asi
        public async Task<ActionResult<GenreDTO>> Get(int id)
        {
            GenreDTO? genreDTO = await context.Genres
                .ProjectTo<GenreDTO>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(g => g.Id == id);

            if (genreDTO == null)
            {
                return NotFound();
            }

            return genreDTO;

        }

    

    [HttpPost]
    public async Task<CreatedAtRouteResult> Post([FromBody] GenreCreationDTO genreCreationDTO)
    {
      Genre genre = mapper.Map<Genre>(genreCreationDTO);
      context.Add(genre); // agregamos el archivo pero todo sigue en memoria, todavia no se guarda en la db
      await context.SaveChangesAsync(); // aca se guarda en la db, además de actualizar automáticamente el objeto en memoria (genre) y le agrega el ID
      await outputCacheStore.EvictByTagAsync(cacheTag, default); // Invalida el cache para que se actualice con los nuevos datos
      // CreatedAtRoute devuelve HTTP 201 (Created) con:
      // 1. Header "Location" apuntando a la URL del recurso creado (usando la ruta "GetGenreById")
      // 2. El objeto creado en el body de la respuesta
      // 3. Parámetros de ruta (id) para construir la URL correcta
      // Ejemplo: Location: https://localhost:5001/api/genres/3

      var genreDTO = mapper.Map<GenreDTO>(genre);
      return CreatedAtRoute("GetGenreById", new { id = genreDTO.Id }, genreDTO);
      
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, [FromBody] GenreCreationDTO genreCreationDTO)
    {
      bool genreExists = await context.Genres.AnyAsync(g => g.Id == id);

      if (!genreExists)
      {
        return NotFound();
      }

      var genre = mapper.Map<Genre>(genreCreationDTO);
      genre.Id = id; 
      context.Update(genre);
      await context.SaveChangesAsync();
      await outputCacheStore.EvictByTagAsync(cacheTag, default);
      return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {

      int deletedRecords = await context.Genres.Where(g => g.Id == id).ExecuteDeleteAsync();

      if (deletedRecords == 0)
      {
        return NotFound();
      }

      await outputCacheStore.EvictByTagAsync(cacheTag, default);
      return NoContent();
    }
  }
}