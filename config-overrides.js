module.exports = function override(config, env) {
    //do stuff with the webpack config...
    console.log(config)
    // if (env === "production") {
    //   console.log("Production build - Adding Workbox for PWAs");
    //   console.log(config)
    //   config = rewireWorkboxGenerate()(config, env);
    // }
  return config;

  }