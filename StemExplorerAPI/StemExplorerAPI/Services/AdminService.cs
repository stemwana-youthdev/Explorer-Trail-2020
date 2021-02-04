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
            var admin = await GetAdmin(data.UserId);

            if (admin == null)
            {
                await CreateUnapprovedAdmin(data.Name, data.UserId);
                return false;
            }
            else
            {
                return admin.Approved;
            }
        }

        private async Task<Admin> GetAdmin(string id)
        {
            return await _context.Admins
                    .Where(p => p.Id == id)
                    .SingleOrDefaultAsync();
        }

        private async Task CreateUnapprovedAdmin(string name, string id)
        {
            var admin = new Admin
            {
                Name = name,
                Id = id,
                Approved = false,
            };
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();
        }
    }
}
