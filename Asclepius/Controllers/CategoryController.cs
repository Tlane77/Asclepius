using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Asclepius.Models;
using Asclepius.Repositories;
using Asclepius.Utils;
using System.Security.Claims;

namespace Asclepius.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;
        private readonly IUserProfileRepository _userProfileRepository;
        public CategoryController(ICategoryRepository categoryRepository,
            IUserProfileRepository userProfileRepository)
        {
            _categoryRepo = categoryRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepo.GetCategoryById(id);
            if (category == null || category.Id == 10)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {
            var currentUserProfile = GetCurrentUserProfile();
            
            _categoryRepo.AddCategory(category);
            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            
            var category = _categoryRepo.GetCategoryById(id);
            if (id == 10 || id != category.Id)
            {
                return BadRequest();
            }
            _categoryRepo.DeleteCategory(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            var currentUserProfile = GetCurrentUserProfile();
           
            if (id == 10 || id != category.Id)
            {
                return BadRequest();
            }
            _categoryRepo.UpdateCategory(category);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}