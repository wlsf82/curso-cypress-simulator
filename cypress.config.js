const { defineConfig } = require("cypress")

const cypressSplit = require("cypress-split")

module.exports = defineConfig({
  viewportHeight: 1024,
  viewportWidth: 1700,
  e2e: {
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      return config
    }
  },
})
