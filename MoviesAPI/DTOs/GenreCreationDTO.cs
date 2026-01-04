using System.ComponentModel.DataAnnotations;
using MoviesAPI.Validations;

namespace MoviesAPI.DTOs
{
  public class GenreCreationDTO
  {
     [Required(ErrorMessage = "You must fill the {0} field")] // {0} referencia el nombre de la prop
    [StringLength(maximumLength: 50)]
    [FirtsLetterUppercase] // validacion custom nuestra
    public required string Name { get; set; }
  }
}
