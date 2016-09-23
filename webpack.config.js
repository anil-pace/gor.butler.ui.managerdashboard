var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: {
    app:['es6-symbol','./src/index.js'],
    vendor: ["react", "react-dom","react-redux","react-intl-redux","redux","react-d3-library","d3","d3-tip"]
  },
  output: { 
    path: __dirname+"/dist", 
    filename: 'assets/bundle.[hash].js',
    chunkFilename: 'assets/chunks/[name].[hash].chunk.js'
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
        plugins:[
                  ['react-intl', {
                  'messagesDir': './src/translations/'
             }]
        ]
      }
    },
    { test: /\.json$/, loader: 'json' }
  ]
},
plugins: [
  // Do not change the sequence
  new webpack.optimize.CommonsChunkPlugin('vendor',"assets/vendor.bundle.js", Infinity),
  new webpack.optimize.CommonsChunkPlugin('common.js', Infinity),
  //End
  new webpack.DefinePlugin({
    MOCK: true
}),
  new webpack.optimize.DedupePlugin(),
  new HtmlWebpackPlugin({
    template: 'index.template.html',
    inject: 'body',
  }),
  new CleanWebpackPlugin(['assets'], {
      root: '/',
      verbose: true, 
      dry: false
    }),
  new CopyWebpackPlugin([

      { from: 'src/assets/images', to: 'assets/images' },
      { from: 'src/assets/css/fonts', to: 'assets/fonts' },
      { from: 'index.html', to: '' }

    ])
]
}
/*Note: Hot Reloading,webpack should not run on all files*/

