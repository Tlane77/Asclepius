using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Asclepius.Models;
using Asclepius.Repositories;

namespace Asclepius.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ConditionController : ControllerBase
    {
        private readonly IConditionRepository _conditionRepository;
        private readonly IUserProfileRepository _userProfileRepository;

       
        public ConditionController(IConditionRepository conditionRepository, IUserProfileRepository userProfileRepository)
        {
            _conditionRepository = conditionRepository;
            _userProfileRepository = userProfileRepository;


        }

        //GRAB ALL THE CONDITIONS,get a unique matching conditions (all)
        [HttpGet]
        public IActionResult GetAllConditions()
        {
            return Ok(_conditionRepository.GetAllConditions());
        }

        //get a unique matching condition by conditon Id (endpoint)
        [HttpGet("{id}")] //id parameter
        public IActionResult Get(int id)
        {
            //Type name = repository .methodGetID(parameter id)( read right to left)
            Condition condition = _conditionRepository.GetConditionById(id);
            //if null return (NotFound)
            if (condition == null)
            {
                return NotFound();
            }
            //Otherwise return OK(status 200) (complete object)/.then response on client side
            return Ok(condition);
        }

        //ADD A CONDITON ACTION
        [HttpPost]
        public IActionResult Post(Condition condition)
        {
            var currentUserProfile = GetCurrentUserProfile();
            condition.UserProfileId = currentUserProfile.Id;
            condition.CreateDateTime = DateTime.Now;
            _conditionRepository.Add(condition);
            return Ok(CreatedAtAction("Get", new { id = condition.Id }, condition));
        }

       

        //UPDATE CONTROLLER ACTION
        [HttpPut("{id}")] //update endpoint
        public IActionResult Put(int id, Condition condition)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var conditionFromDB = _conditionRepository.GetConditionById(id);
            if (conditionFromDB.UserProfileId == currentUserProfile.Id)
            {
                if (id != condition.Id)
                {
                    return BadRequest();
                }
                condition.UserProfileId = conditionFromDB.UserProfileId;
                condition.CreateDateTime = conditionFromDB.CreateDateTime;

                _conditionRepository.Update(condition);

                return Ok();
            }
            else
            {
                return Unauthorized();
            }

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var condition = _conditionRepository.GetConditionById(id);

            if (condition.UserProfileId == currentUserProfile.Id)
            {
                _conditionRepository.DeleteCondition(id);
                return NoContent();
            }

            else
            {
                return Unauthorized();
            }
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
