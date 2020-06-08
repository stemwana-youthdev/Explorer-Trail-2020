using Microsoft.EntityFrameworkCore;
using StemExplorerAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models
{
    public class StemExplorerContext : DbContext
    {
        public StemExplorerContext()
        {

        }

        public StemExplorerContext(DbContextOptions<StemExplorerContext> options) : base(options)
        {
            
        }

        internal DbSet<Challenge> Challenges { get; set; }
        internal DbSet<Location> Locations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
