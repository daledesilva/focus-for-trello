const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");

module.exports = (env, argv) => {
    function isDevelopment() {
		return argv.mode === "development";
    }
    
    var config = {

        entry: {
            injected: "./src/injected/functionality.js",
            //popup: "./src/popup/functionality.js",
		},
		output: {
			filename: "[name].js"
        },

		plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new CopyPlugin({
                patterns: [
                    { from: './src/includes' },
                ],
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css"
			}),
			new CleanWebpackPlugin()
			
		],
        
        devtool: isDevelopment() ? "cheap-module-source-map" : "",

        module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
                        loader: "babel-loader", 
                        options: {
                            plugins: [
                                "@babel/plugin-proposal-class-properties",                      // transpiles es6 to es5
                                "@babel/plugin-syntax-jsx",                                     // Allow parsing of JSX
                                ["@babel/plugin-transform-react-jsx", { "pragma": "dom" }]      // turns JSX into react function calls
                            ],
							presets: [
								"@babel/preset-env", // transpiles es6 and other latest javascript to cross-platform es5
								// [
								// 	"@babel/preset-react",
								// 	{
								// 		// these make sure JSX is converted into a wp.element (wrapper for React) command instead of a React command directly
								// 		pragma: "wp.element.createElement",
								// 		pragmaFrag: "wp.element.Fragment",
								// 		// applies development mode for React based on mode arguement passed through in package script
								// 		development: isDevelopment()
								// 	}
								// ]
							]
							// automatically uses browserlist from package.json too
						}
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // loaders are applied in bottom up order
                        /////////////////////////////////////////

                        // 4. place css in separate file
                        MiniCssExtractPlugin.loader,

                        // 3. resolve urls, etc. in css
                        "css-loader",

                        // 2. Apply browser specific prefixes to css
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    autoprefixer() // uses browserlist from package.json automatically
                                ]
                            }
                        },

                        // 1. interpret sass into css
                        "sass-loader"

                    ]
                    
                }
            ]
        },
    };

    return config;
};



