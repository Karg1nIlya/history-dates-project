import webpack from "webpack";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, IBuildPaths } from "./config/build/types/types";
import path from "path";

interface IEnvVariables {
    mode: BuildMode;
    port: number;
    analyzer: boolean;
}

export default (env: IEnvVariables) => {
    const paths: IBuildPaths = {
        output: path.resolve(__dirname, "dist"),
        entry: path.resolve(__dirname, "src", "app", "index.tsx"),
        html: path.resolve(__dirname, "public", "index.html"),
        src: path.resolve(__dirname, "src"),
        public: path.resolve(__dirname, "public")
    };

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? Number(process.env.DEFAULT_PORT),
        mode: env.mode ?? "development",
        paths: paths,
        analyzerBundles: env.analyzer
    });

    return config;
};
