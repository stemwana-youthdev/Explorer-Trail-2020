module.exports = {
  '/admin': {
    target: process.env.ADMIN_URL || 'http://localhost:4300',
  },
  '/api': {
    target: process.env.API_HOST || 'http://localhost:5000',
    bypass(req) {
      if (process.env.USE_FIXTURES !== 'true') return;

      switch (req.originalUrl) {
        case '/api/Challenge/GetChallenges':
          return '/assets/challenges.json';
        case '/api/Location/GetLocations':
          return '/assets/locations.json';
      }
    },
  },
};
