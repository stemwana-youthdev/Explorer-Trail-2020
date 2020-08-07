using Microsoft.EntityFrameworkCore;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.Entities;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services
{
    public class UserService : IUserService
    {
        private readonly StemExplorerContext _context;
        public UserService(StemExplorerContext context)
        {
            _context = context;
        }

        public async Task<UserDto> GetUser(string userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return null;
            }

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
            };
        }

        public async Task<UserDto> CreateUser(UserDto userInfo)
        {
            var user = new User
            {
                Id = userInfo.Id,
                Name = userInfo.Name,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
            };
        }
    }
}

