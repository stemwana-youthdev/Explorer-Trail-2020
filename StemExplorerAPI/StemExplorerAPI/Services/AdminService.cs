using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.Entities;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services
{
    public class AdminService : AuthorizationHandler<RolesAuthorizationRequirement>, IAdminService
    {
        private readonly StemExplorerContext _context;
        private readonly IFirebaseTokenService _firebaseTokenService;
        public AdminService(StemExplorerContext context, IFirebaseTokenService firebaseTokenService)
        {
            _context = context;
            _firebaseTokenService = firebaseTokenService;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, RolesAuthorizationRequirement requirement)
        {
            if (requirement.AllowedRoles.Contains("Admin") && await UserIsAdmin(context.User))
            {
                context.Succeed(requirement);
            }
        }

        public async Task<bool> UserIsAdmin(ClaimsPrincipal user)
        {
            var data = _firebaseTokenService.GetTokenData(user);
            if (!data.EmailVerified)
            {
                return false;
            }

            var admin = await GetAdmin(data.Email);
            return admin != null;
        }

        private async Task<Admin> GetAdmin(string email)
        {
            return await _context.Admins
                    .Where(a => a.Email == email)
                    .SingleOrDefaultAsync();
        }

        public async Task<List<string>> GetAllAdmins()
        {
            return await _context.Admins
                    .Select(a => a.Email)
                    .ToListAsync();
        }

        public async Task DeleteAdmin(string email)
        {
            var admin = await GetAdmin(email);
            _context.Admins.Remove(admin);
            await _context.SaveChangesAsync();
        }

        public async Task CreateAdmin(string email)
        {
            var admin = new Admin
            {
                Email = email,
            };
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();
        }
    }
}
