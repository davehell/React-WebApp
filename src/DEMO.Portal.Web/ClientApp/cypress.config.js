const { defineConfig } = require("cypress");

module.exports = defineConfig({
  webApiUrl: "http://localhost:5000/",
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://localhost:3000/#/",
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
