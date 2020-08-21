const path = require("path");
const webpack = require("webpack");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin} = require("clean-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = env => {
	const outFolder = "./out";
	const sourceFolder = "./src";
	const assetsFolder = "./assets";
	
	const envRelease = !!(env && env["release"]);
	const envServer = !!(env && env["server"]);
	
	const config = {
		cache: true,
		mode: envRelease ? "production" : "development",
		entry: {
			main: sourceFolder + "/Main.ts",
			vendor: [
				"babel-polyfill",
			]
		},
		output: {
			path: path.resolve(__dirname, outFolder),
			filename: "[name].js",
			chunkFilename: "[chunkhash].js",
			library: "home"
		},
		devtool: envRelease ? "(none)" : "inline-source-map",
		module: {
			rules: [{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [{
					loader: "babel-loader",
					options: {
						"presets": [
							"@babel/preset-env"
						]
					}
				}, {
					loader: "ts-loader"
				}]
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: "babel-loader",
					options: {
						"presets": [
							"env"
						]
					}
				}]
			}]
		},
		resolve: {
			extensions: [".ts", ".js"],
		},
	};
	
	const plugins = [];

	if (!envServer) {
		let cleanWebpackPlugin = new CleanWebpackPlugin();
		cleanWebpackPlugin.cleanStaleWebpackAssets = false;
		plugins.push(cleanWebpackPlugin);
	}

	plugins.push(
		new CopyWebpackPlugin(
			[{from:assetsFolder}],
			{debug: "debug"}
		)
	);

	plugins.push(
		new webpack.ProvidePlugin({
			PIXI: 'pixi.js'
		})
	);

	if (!envRelease) {
		plugins.push(
			new CircularDependencyPlugin({
				entry: "src",
				exclude: /a\.js|node_modules/,
				cwd: process.cwd(),
			})
		);
	}

	if (!envServer) {
		let params = {};
		params["host"] = "localhost";
		params["port"] = 3000;
		params["server"] = {baseDir: [outFolder]};
		plugins.push(new BrowserSyncPlugin(params));
	}
	
	config.plugins = plugins;
	return config;
};