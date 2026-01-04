using Microsoft.EntityFrameworkCore;
using MoviesAPI.Entities;
using System.Collections.Generic;

namespace MoviesAPI
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        // con esto digo que quiero crear una nueva tabla con las columnas de la entity Genre y la tabla se va a llamar Genres
        public DbSet<Genre> Genres { get; set; }
    }
}