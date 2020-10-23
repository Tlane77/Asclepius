﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asclepius.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        //[Required]
        public string Name { get; set; }

        //[Required]
        public string Email { get; set; }

        public string ImageUrl { get; set; }

        //[Required]
        public DateTime DateCreated { get; set; }

    }
}
