require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");
const withCss = require('@zeit/next-css')

module.exports = withCss({
  webpack(config) {
    // Further custom configuration here
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    return config
  },
})