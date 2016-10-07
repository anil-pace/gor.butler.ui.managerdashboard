var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var isDev = (process.env.TARGET === "DEV" ? true :false);
var isMock = (process.env.MOCK === "true" ? true :false);

console.log("Environment:"+process.env.TARGET);
console.log("Mocking:"+process.env.MOCK);
/**
 * [appGetEntry get array of entry points based on TARGET]
 * @return {[Array]} [Array of enrty strings]
 */
function appGetEntry(){
    if(isDev){
        return['es6-symbol', 
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/dev-server',
            './src/index.js'
            ]
    }
    else{
        return['es6-symbol',
            './src/index.js'
            ]
    }
}
function getPlugins(){
    var plugins = [
            // Do not change the sequence
            new webpack.optimize.CommonsChunkPlugin('vendor', "assets/vendor.bundle.js"),
            new webpack.optimize.CommonsChunkPlugin('common.js', "assets/common.js"),
            //End
            new webpack.DefinePlugin({
                MOCK: isMock
            }),
            new webpack.optimize.DedupePlugin(),
            new HtmlWebpackPlugin({
                template: 'index.template.html',
                inject: 'body',
            }),
            new WebpackCleanupPlugin({
                exclude: ["package.sh", "index.html"]
            }),
            new CopyWebpackPlugin([

                {
                    from: 'src/assets/images',
                    to: 'assets/images'
                }, {
                    from: 'src/assets/fonts',
                    to: 'assets/fonts'
                }, {
                    from: 'index.html',
                    to: ''
                }
            ]),
            new webpack.HotModuleReplacementPlugin()
        ]
    if(!isDev){
        plugins.push(new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false,
                    semicolons: true
                },
                sourceMap: true
            }));
        
    }
    return plugins;
}
module.exports = {
        cache: true,
        devtool: isDev ? 'eval' : 'source-map',
        entry: {
            app: appGetEntry(),
            vendor: ["react", "react-dom", "react-redux", "react-intl-redux", "redux", "react-d3-library", "d3", "d3-tip", "react-redux-modal"]
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'assets/bundle.[hash].js',
            chunkFilename: 'assets/chunks/[name].[hash].chunk.js'

        },
        module: {
            loaders: [
            
             
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"],
                include: path.join(__dirname, 'src')
            },
            
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
                    presets: ['es2015', 'stage-2', 'react'],
                    cacheDirectory: true,
                    plugins: [
                        ['react-intl', {
                            'messagesDir': './src/formattedMessages/'
                        }]
                    ]
                }
            }, {
                test: /\.json$/,
                loader: 'json'
            }]
        },
        
        plugins: getPlugins(),
        devServer:{
            hot:true,
            contentBase:['./dist','./dist/assets']
        }
    }
   