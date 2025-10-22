import path from "path";
import { Configuration } from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { IBuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import Dotenv from "dotenv-webpack";

export function buildPlugins(options: IBuildOptions): Configuration["plugins"] {
    const isDev = options.mode === "development";

    return [
        new HTMLWebpackPlugin({
            template: options.paths.html,
            favicon: path.resolve(options.paths.public, "favicon.ico")
        }),
        !isDev &&
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css"
            }),
        !isDev && options.analyzerBundles && new BundleAnalyzerPlugin(), // для анализа bundle
        isDev && new ForkTsCheckerWebpackPlugin(), // для вынесение проверки типов в ts в отдельный процесс: не нагружает сборку
        isDev && new ReactRefreshWebpackPlugin(),
        new Dotenv()
    ];
}
