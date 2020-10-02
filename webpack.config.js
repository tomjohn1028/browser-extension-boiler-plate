/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

const isEnvDevelopment = process.env.NODE_ENV !== "production";

const tsRule = { test: /\.tsx?$/, loader: "ts-loader" };

const extensionConfig = (env, args) => {
  return {
    context: __dirname,
    name: "extension",
    mode: isEnvDevelopment ? "development" : "production",
    // In development environment, turn on source map.
    devtool: isEnvDevelopment ? "inline-source-map" : false,
    // In development environment, webpack watch the file changes, and recompile
    watch: isEnvDevelopment,
    entry: {
      popup: ["./src/ui/popup.tsx"],
    },
    output: {
      path: path.resolve(
        __dirname,
        isEnvDevelopment ? "dist/dev" : "dist/prod"
      ),
      filename: "[name].bundle.js",
    },
    module: {
      rules: [tsRule],
    },
    plugins: [
      // Remove all and write anyway
      // TODO: Optimizing build process
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: "./src/chromium_extension/manifest.json",
          },
          {
            from: "node_modules/webextension-polyfill/dist/browser-polyfill.js",
          },
          {
            from: "./src/ui/popup.html",
            transformPath(targetPath, absolutePath) {
              return targetPath.replace(/src\/ui\//, "");
            },
          },
          {
            from: "./src/assets/icons/**/*.png",
            transformPath(targetPath, absolutePath) {
              return targetPath.replace(/src\//, "");
            },
          },
        ],
      }),
      new WriteFilePlugin(),
      new webpack.EnvironmentPlugin(["NODE_ENV"]),
    ],
  };
};

module.exports = extensionConfig;
