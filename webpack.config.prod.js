const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = () => {
  return {
    mode: "production",
    entry: {
      index: "./src/index.js",
    },
    devtool: "source-map",
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          MAPBOX_API_KEY: JSON.stringify(process.env.MAPBOX_API_KEY),
          BUCKET_SLUG: JSON.stringify(process.env.BUCKET_SLUG),
          READ_KEY: JSON.stringify(process.env.READ_KEY),
          RAPID_API_KEY: JSON.stringify(process.env.RAPID_API_KEY),
          WEATHERSTACK_API_KEY: JSON.stringify(
            process.env.WEATHERSTACK_API_KEY
          ),
          WEATHER_API_URL: JSON.stringify(process.env.WEATHER_API_URL),
        },
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/template.html",
        title: "Produksjon",
      }),
      new CopyPlugin({
        patterns: [{ from: "./other", noErrorOnMissing: true }],
      }),
    ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "public"),
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
    },
  };
};
