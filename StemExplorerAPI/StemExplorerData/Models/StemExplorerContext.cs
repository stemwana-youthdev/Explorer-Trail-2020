using Microsoft.EntityFrameworkCore;
using StemExplorerData.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerData.Models
{
    public class StemExplorerContext : DbContext
    {
        public StemExplorerContext()
        {

        }

        public StemExplorerContext(DbContextOptions<StemExplorerContext> options) : base(options)
        {
        }

        public DbSet<Challenge> Challenges { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<ChallengeLevel> ChallengeLevels { get; set; }
        public DbSet<ExternalContent> ExternalContent { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Progress> Progress { get; set; }
        public DbSet<Profile> Profiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Challenge>()
                .Property(c => c.Category)
                .HasConversion<int>();
            
            modelBuilder.Entity<ChallengeLevel>()
                .Property(c => c.AnswerType)
                .HasConversion<int>();
            
            modelBuilder.Entity<ChallengeLevel>()
                .Property(c => c.Difficulty)
                .HasConversion<int>();
            
            modelBuilder.Entity<Progress>()
                .HasIndex(c => new { c.ProfileId, c.ChallengeLevelId })
                .IsUnique();
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
