using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Asclepius.Models
{
    public class Condition
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }


        public string ImageLocation { get; set; }

        public DateTime CreateDateTime { get; set; }


        

        [Required]
        public int CategoryId { get; set; }

        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public Category Category { get; set; }

    }
}
