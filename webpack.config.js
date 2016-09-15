var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: './src/index.js',
  output: { 
    path: __dirname, 
    filename: 'dist/bundle.js',
    chunkFilename: 'dist/chunks/[name].chunk.js'
   },
  module: {
  loaders: [
    {
      loader: "babel-loader",

      // Skip any files outside of your project's `src` directory
      include: [
        path.resolve(__dirname, "src"),
      ],
      exclude: [
        path.resolve(__dirname, "node_modules"),
      ],
      
      // Options to configure babel with
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-2', 'react'],
      }
    },
  ]
},
plugins: [
  new webpack.optimize.CommonsChunkPlugin('common.js')
]
}


