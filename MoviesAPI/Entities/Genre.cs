using System.ComponentModel.DataAnnotations;
using MoviesAPI.Validations;

namespace MoviesAPI.Entities
{
    public class Genre
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "You must fill the {0} field")] // {0} referencia el nombre de la prop
        [StringLength(maximumLength: 50)]
        [FirtsLetterUppercase] // validacion custom nuestra
        public required string Name { get; set; }

    }
}