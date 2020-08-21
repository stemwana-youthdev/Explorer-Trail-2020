module.exports = {
  '/api': {
    target: process.env.API_HOST || 'http://localhost:5000',
    bypass(req) {
      if (process.env.USE_FIXTURES !== 'true') return;

      switch (req.originalUrl) {
        case '/api/Challenges':
          return '/assets/challenges.json';
        case '/api/Locations':
          return '/assets/locations.json';
        case '/api/ChallengeLevels':
          return '/assets/challengeLevels.json';
      }
    },
  },
};
