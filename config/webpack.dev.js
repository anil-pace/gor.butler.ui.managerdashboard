const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ROOT_PATH = path.join(__dirname, '..');
//const isDev = (process.env.TARGET === "DEV" ? true :false);
//const reactNodeEnv = isDev ? 'dev' : 'production';
//const isMock = (process.env.MOCK === "true" ? true :false);

console.log("Environment:"+process.env);
/*
 * [appGetEntry get array of entry points based on TARGET]
 * @return {[Array]} [Array of enrty strings]
 */
//const ROOT_PATH = path.join(__dirname, '..');
module.exports = {
        cache: false,
        devtool: 'eval',
        entry: {
            app: ['es6-symbol', 
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/dev-server',
            './src/index.js'
            ],
            vendor: ["react", "react-dom", "react-redux", "react-intl-redux", "redux", "react-d3-library", "d3", "d3-tip", "react-redux-modal"]
        },
        output: {
            path: `${ROOT_PATH}/dist/`,//path.join(__dirname, 'dist'),
            filename: `assets/bundle.[chunkhash].js`,
            chunkFilename: `assets/chunks/[name].[chunkhash].chunk.js`

        },
        module: {
            rules: [
            
             
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"],
                include: `${ROOT_PATH}/src/`
            },
            
              {
                loader: "babel-loader",

                // Skip any files outside of your project's `src` directory
                include: [
                    /*path.resolve(__dirname, "build"),
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "mock")*/
                    `${ROOT_PATH}/build/`,
                    `${ROOT_PATH}/src/`,
                    `${ROOT_PATH}/mock/`
                ],
                exclude: [
                    `${ROOT_PATH}/node_modules/`//path.resolve(__dirname, "node_modules"),
                ],

                // Options to configure babel with
               
            }, {
                test: /\.json$/,
                loader: 'json'
            }]
        },
          optimization: {
                splitChunks: {
                  chunks: 'async',
                  minSize: 30000,
                  maxSize: 0,
                  minChunks: 1,
                  maxAsyncRequests: 5,
                  maxInitialRequests: 3,
                  automaticNameDelimiter: '~',
                  name: true,
                  cacheGroups: {
                    vendors: {
                      test: /[\\/]node_modules[\\/]/,
                      priority: -10
                    },
                    default: {
                      minChunks: 2,
                      priority: -20,
                      reuseExistingChunk: true
                    }
                  }
                }
              },
        plugins: [
            // Do not change the sequence
            
            //End
            new webpack.DefinePlugin({
                "process.env": {
                        NODE_ENV: JSON.stringify('dev')
                }
            }),
           
            new HtmlWebpackPlugin({
                template: `${ROOT_PATH}/index.template.html`,
                inject: 'body',
            }),
            
            new CopyWebpackPlugin([

                {
                    from: `${ROOT_PATH}/src/assets/images`,
                    to: `${ROOT_PATH}/public/assets/images`
                }, {
                    from: `${ROOT_PATH}/src/assets/fonts`,
                    to: `${ROOT_PATH}/public/assets/fonts`
                }, {
                    from: `${ROOT_PATH}/index.html`,
                    to: ''
                }
            ]),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer:{
            hot:true,
            contentBase:[`${ROOT_PATH}/dist`,`${ROOT_PATH}/dist/assets`]
        }
    }