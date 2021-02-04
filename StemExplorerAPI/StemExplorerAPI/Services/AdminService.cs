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
                    .Where(p => p.Email == email)
                    .SingleOrDefaultAsync();
        }
    }
}
