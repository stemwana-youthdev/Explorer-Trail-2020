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
                FirstName = user.FirstName,
                LastName = user.LastName,
                ContactNumber = user.ContactNumber,
                HomeTown = user.HomeTown,
            };
        }

        public async Task<UserDto> CreateUser(UserDto userInfo)
        {
            var user = new User
            {
                Id = userInfo.Id,
                FirstName = userInfo.FirstName,
                LastName = userInfo.LastName,
                ContactNumber = userInfo.ContactNumber,
                HomeTown = userInfo.HomeTown,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ContactNumber = user.ContactNumber,
                HomeTown = user.HomeTown,
            };
        }

        public async Task UpdateUser(UserDto userInfo)
        {
            var user = await _context.Users.FindAsync(userInfo.Id);

            if (user == null)
            {
                return;
            }

            user.FirstName = userInfo.FirstName;
            user.LastName = userInfo.LastName;
            user.ContactNumber = userInfo.ContactNumber;
            user.HomeTown = userInfo.HomeTown;
        }
    }
}

