using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asclepius.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Asclepius.Models;
using Asclepius.Utils;

namespace Asclepius.Controllers
{
        [Authorize]
        [Route("api/[controller]")]
        [ApiController]
        public class CommentController : ControllerBase
        {
            private readonly IUserProfileRepository _userProfileRepository;
            private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository,
                IUserProfileRepository userProfileRepository)
            {
                _commentRepository = commentRepository;
                _userProfileRepository = userProfileRepository;
            }
            // GET: api/<CommentController>

            [HttpGet]
            public IActionResult GetAll()
        {
            return Ok(_commentRepository.GetAllComments());
        }


        // GET api/<CommentController>/5
        [HttpGet("{id}")]
            public IActionResult GetCommentById(int id)
            {
                return Ok(_commentRepository.GetCommentById(id));
            }

            [HttpGet("GetCommentsByConditionId/{id}")]
            public IActionResult GetCommentsByConditionId(int id)
            {
                return Ok(_commentRepository.GetCommentsByConditionId(id));
            }


            // POST api/<CommentController>
            [HttpPost]
            public IActionResult Add(Comment comment)
            {
                var currentUserProfile = GetCurrentUserProfile();
                if (currentUserProfile == null)
                {
                    return Unauthorized();
                }
                _commentRepository.Add(comment);
                return base.Created("", comment); //returns the comment, not including headers
            }

            // PUT api/<CommentController>/5
            [HttpPut("{id}")]
            public IActionResult Put(int id, Comment comment)
            {
                var currentUserProfile = GetCurrentUserProfile();
                if (currentUserProfile.Id != _commentRepository.GetCommentById(id).UserProfileId)
                {
                    return Unauthorized();
                }
                if (id != comment.Id)
                {
                    return BadRequest();
                }
                _commentRepository.Update(comment);
                return Ok();
            }

            // DELETE api/<CommentController>/5
            [HttpDelete("{id}")]
            public IActionResult Delete(int id)
            {
                var currentUserProfile = GetCurrentUserProfile();
                if (currentUserProfile.Id != _commentRepository.GetCommentById(id).UserProfileId )
                {
                    return Unauthorized();
                }

                _commentRepository.Delete(id);
                return NoContent();
            }

            private UserProfile GetCurrentUserProfile()
            {
                var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            }

        }
    }
