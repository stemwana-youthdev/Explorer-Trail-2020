/* eslint-disable */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser globals (Note: root is window)
    root.env = factory();
  }
})(this, function() {
  return {
    API_ENDPOINT: '/api',
    // If you are afraid that you might accidentally commit this, run:
    // git update-index --skip-worktree src/env.js
    AUTH_API: 'AIzaSyAdlcKOJpmnJlm1XAJhhhsAU2ElSJjkyYM',
    TERMS_LINK: 'https://stemwana.nz/explorer-terms-and-conditions/'
  };
});
