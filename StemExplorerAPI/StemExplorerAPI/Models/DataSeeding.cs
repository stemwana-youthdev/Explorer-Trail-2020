using Microsoft.EntityFrameworkCore;
using StemExplorerAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models
{
    public class DataSeeding
    {
        internal static void Seed(ModelBuilder modelBuilder)
        {
            var location = new Location { LocationId = 1, Name = "Basestation", Latitude = -37.6865807, Longitude = 176.1649332, Url = "https://www.basestation.nz/en" };
            var location2 = new Location { LocationId = 2, Name = "Trustpower", Latitude = -37.6857656, Longitude = 176.1679695, Url = "https://www.trustpower.co.nz/" };
            var location3 = new Location { LocationId = 3, Name = "i-SITE", Latitude = -37.6855958, Longitude = 176.1690853, Url = "https://www.newzealand.com/in/plan/business/tauranga-i-size-visitor-information-centre/" };
            var location4 = new Location { LocationId = 4, Name = "Tauranga City Library", Latitude = -37.6845175, Longitude = 176.1678085, Url = "https://library.tauranga.govt.nz/" };

            var challenge = new Challenge { Id = 1, Title = "Day of the week", Description = "ABCDE", Category = Enums.ChallengeCategories.Science, LocationId = 1 };
            var challenge2 = new Challenge { Id = 2, Title = "How many numbers", Description = "123456", Category = Enums.ChallengeCategories.Technology, LocationId = 1 };
            var challenge3 = new Challenge { Id = 3, Title = "Biscuits, biscuits, biscuits", Description = "PQWOEUR", Category = Enums.ChallengeCategories.Engineering, LocationId = 2 };
            var challenge4 = new Challenge { Id = 4, Title = "Do you know your stem?", Description = "STEM STEM", Category = Enums.ChallengeCategories.Mathematics, LocationId = 3 };
            var challenge5 = new Challenge { Id = 5, Title = "Another challenge", Description = "TEST TICKLES", Category = Enums.ChallengeCategories.Science, LocationId = 4 };
            var challenge6 = new Challenge { Id = 6, Title = "How about this one", Description = "Last one", Category = Enums.ChallengeCategories.Science, LocationId = 4 };

            var externalContent = new ExternalContent { Id = 1, Title = "Tauranga STEM Festival", Url = "https://www.taurangastemfestival.co.nz/", Order = 2 };
            var externalContent2 = new ExternalContent { Id = 2, Title = "Google Maps", Url = "https://www.google.co.nz/maps", Order = 1 };
            

            modelBuilder.Entity<Location>().HasData(location);
            modelBuilder.Entity<Location>().HasData(location2);
            modelBuilder.Entity<Location>().HasData(location3);
            modelBuilder.Entity<Location>().HasData(location4);

            modelBuilder.Entity<Challenge>().HasData(challenge);
            modelBuilder.Entity<Challenge>().HasData(challenge2);
            modelBuilder.Entity<Challenge>().HasData(challenge3);
            modelBuilder.Entity<Challenge>().HasData(challenge4);
            modelBuilder.Entity<Challenge>().HasData(challenge5);
            modelBuilder.Entity<Challenge>().HasData(challenge6);

            modelBuilder.Entity<ExternalContent>().HasData(externalContent);
            modelBuilder.Entity<ExternalContent>().HasData(externalContent2);
        }
    }
}
