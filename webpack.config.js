var path = require( 'path' );
var webpack = require( 'webpack' );

var projRoot = __dirname; 
var srcRoot = path.resolve( projRoot, 'src' );
var distRoot = path.resolve( projRoot, 'dist' );

module.exports = {
    entry: './src/app.js'
    , output: {
        path: distRoot
        , filename: 'bundle.js'
    }
    , module: {
        rules: [
            {
                test: /\.jsx?$/
                , use: {
                    loader: 'babel-loader'
                    , options: {
                        presets: [ 'es2015', 'react' ]
                    }
                }
            }
            , {
                test: /\.s?css$/
                , use: [
                    'style-loader'
                    , {
                        loader: 'css-loader'
                        , options: {
                            modules: true
                        }
                    }
                    , 'sass-loader'
                ]
            }
            , {
                test: /\.(woff|eot|svg|ttf)$/
                , use: {
                    loader: 'file-loader'
                    , options: {
                        publicPath: '../dist/'
                    }
                }
            }
        ]
    }
};
