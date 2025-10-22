import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { IBuildOptions } from "./types/types";

export function buildDevServer(options: IBuildOptions): DevServerConfiguration {
    return {
        port: options.port ?? Number(process.env.DEFAULT_PORT),
        open: true,
        historyApiFallback: true,
        liveReload: true
    };
}
