using System.Security.Claims;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository,IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users=await _userRepository.GetMembersAsync();
            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdate)
        {
            var username=User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user=await _userRepository.GetUserByUsernameAsync(username);
            _mapper.Map(memberUpdate, user);
            _userRepository.Update(user);
            if (await _userRepository.SaveAllChangesAsync()) return NoContent();
            return BadRequest("Failed to update user");
            
        }
        [HttpDelete("{username}")]
         public async Task<ActionResult> DeleteUser(string username)
         {
            await _userRepository.DeleteUser(username);
            return Ok(StatusCodes.Status200OK);
         }

    }
}