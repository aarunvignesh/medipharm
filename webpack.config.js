var webpack = require('webpack'),
    path = require('path'),
    copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry:{
        "app": path.resolve(__dirname,"./client/main.ts"),
        "vendor": path.resolve(__dirname,"./client/vendor.ts")
    },
    resolve:{
        extensions: [".ts",".js",".vue"]
    },


    optimization:{
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }
    },


    output:{
        path: path.resolve(__dirname,"./public/js"),
        filename: '[name].js',
        chunkFilename: '[name]-[id].chunk.js',
        library: 'ac_[name]',
        libraryTarget: 'var'
    },

    // Modules
    module: {
        // Rules with Loaders
        rules: [
            {
                test: /\.ts$/,
                exclude: [],
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: path.resolve(process.cwd(), 'client/tsconfig.json')
                        }
                    }, {
                        loader: 'angular2-template-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'to-string-loader'
                    }, {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg' // 👈 Add loader
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.png$/,
                loader: 'url-loader',
                query: {
                    mimetype: 'image/png'
                }
            }
            , {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ],

        // warnings
        exprContextCritical: false
    },

    // Plugins
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker(\\|\/)@angular/,
            path.resolve(process.cwd()),
            {}
        ),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['app', 'vendor'],
        //     children: true,
        //     async: true,
        //     minChunks: 3
        // }),

        new copyWebpackPlugin([
            // // App Images
            // {
            //     context: path.resolve(process.cwd(), 'client/contents/images'),
            //     from: '*',
            //     to: path.resolve(process.cwd(), 'public/images')
            // },

            // // FavIcon
            // {
            //     from: path.resolve(process.cwd(), 'client/contents/favicon.ico'),
            //     to: path.resolve(process.cwd(), 'public/favicon.ico')
            // }
        ])
    ]
};