var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    app:['es6-symbol','./src/index.js'],
    vendor: ["react", "react-dom","react-redux","react-intl-redux","redux","react-d3-library","d3","d3-tip"]
  },
  output: { 
    path: __dirname, 
    filename: 'dist/bundle.[hash].js',
    chunkFilename: 'dist/chunks/[name].[hash].chunk.js'
   },
  module: {
  loaders: [
    {
      loader: "babel-loader",

      // Skip any files outside of your project's `src` directory
      include: [
        path.resolve(__dirname, "build"),
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "mock")
      ],
      exclude: [
        path.resolve(__dirname, "node_modules"),
      ],
      
      // Options to configure babel with
      query: {
        presets: ['es2015', 'stage-1', 'react'],
        plugins: ['transform-runtime',["react-intl", {
                "enforceDescriptions": true
          }]
        ]
      }
    },
    { test: /\.json$/, loader: 'json' }
  ]
},
plugins: [
  // Do not change the sequence
  new webpack.optimize.CommonsChunkPlugin('vendor',"dist/vendor.bundle.js"),
  new webpack.optimize.CommonsChunkPlugin('common.js'),
  //End
  new webpack.DefinePlugin({
    MOCK: true
}),
  new webpack.optimize.DedupePlugin(),
  new HtmlWebpackPlugin({
    template: 'index.template.html',
    inject: 'body',
  })
]
}
/*Note: Hot Reloading,webpack should not run on all files*/

