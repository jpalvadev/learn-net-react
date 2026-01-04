using Microsoft.AspNetCore.Mvc;

namespace MoviesAPI.DTOs
{
    public class PaginationAndFilterDTO
    {
        public int PageIndex { get; set; } = 0; 
        private int pageSize = 10;
        private int maximumPageSize = 50;
        public string? SortBy { get; set; }
                
        public int PageSize
        {
            get
            {
                return pageSize;
            }
            set
            {
                pageSize = (value > maximumPageSize) ? maximumPageSize : value;
            }
        }
    }
}