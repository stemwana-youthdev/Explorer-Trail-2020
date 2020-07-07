module.exports = {
  '/api': {
    bypass(req) {
      switch (req.originalUrl) {
        case '/api/Challenge/GetChallenges':
          return '/assets/challenges.json';
        case '/api/Location/GetLocations':
          return '/assets/locations.json';
      }
    },
  },
};
