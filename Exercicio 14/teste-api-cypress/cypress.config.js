const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://serverest.dev/",
    
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "mochawesome-report",
      overwrite: false,
      html: false,
      json: true
    },
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
