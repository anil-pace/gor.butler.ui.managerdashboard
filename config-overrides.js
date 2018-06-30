const rewireEslint = require("react-app-rewire-eslint");

function overrideEslintOptions(options) {
  // do stuff with the eslint options...
  return options;
}

const {rewireWorkboxGenerate} = require('react-app-rewire-workbox');

/* config-overrides.js */
  module.exports = function override(config, env) {
  console.log("Production build - Adding Workbox for PWAs");
  console.log(config);
  config = rewireWorkboxGenerate()(config, env);

  config = rewireEslint(config, env);
  return config;
};
