module.exports = {
  '/api': {
    target: process.env.API_HOST || 'http://localhost:5000',
    bypass(req) {
      if (process.env.USE_FIXTURES !== 'true') return;

      switch (req.originalUrl) {
        case '/api/Challenge/GetChallenges':
          return '/assets/challenges.json';
        case '/api/Location/GetLocations':
          return '/assets/locations.json';
        case '/api/ChallengeLevel/GetLevels':
          return '/assets/challengeLevels.json';
      }
    },
  },
};
