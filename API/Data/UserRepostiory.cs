using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepostiory : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepostiory(DataContext context,IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
            .SingleOrDefaultAsync(x=>x.UserName==username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .ToListAsync();
        }

        public async Task<AppUser> GetUsersByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<bool> SaveAllChangesAsync()
        {
            return await _context.SaveChangesAsync()>0;
        }

        public void Update(AppUser AppUser)
        {
            _context.Entry(AppUser).State=EntityState.Modified;
        }

         public async Task DeleteUser(string username)
         {
            AppUser usertodelete= await _context.Users.SingleOrDefaultAsync(x=>x.UserName==username);
            _context.Users.Remove(usertodelete);
            await _context.SaveChangesAsync();   
         }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
            .Where(x=>x.UserName==username)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await _context.Users
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
            
        }

    }
}