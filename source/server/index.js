import http from "http";
import next from "next";
import koa from "koa";
import kcors from "kcors";
import koaBodyParser from "koa-bodyparser";
import koaLogger from "koa-logger";
import koaJwt from "koa-jwt";
import koaUnless from "koa-unless";
import koaFavicon from "koa-favicon";

import { host, isProduction, jwtSecret, port } from "./config";
import router, { nextJSRouterPaths, publicRoutes } from "./routes";
import { initDB } from "../db";

export const start = async () => {
    console.log(__dirname);
    const app = new koa();
    koaJwt.unless = koaUnless;
    koaLogger.unless = koaUnless;
    app.use(kcors({ origin: "*" }));
    app.use(koaFavicon(`${__dirname}/../static/images/logo.ico`));
    app.use(koaBodyParser());
    app.use(koaLogger());
    app.use(
        koaJwt({
            secret: jwtSecret,
            debug: true,
            cookie: "jwtToken",
            key: "jwtData"
        }).unless({
            custom: function({ originalUrl }) {
                for (const regExp of [...publicRoutes, nextJSRouterPaths]) {
                    if (regExp.test(originalUrl)) {
                        return true;
                    }
                }
                return false;
            }
        })
    );
    app.use(router.routes());
    app.use(router.allowedMethods());

    const dev = !isProduction;
    const nextApp = next({
        dev,
        dir: `${__dirname}/..`
    });
    await nextApp.prepare();

    const models = await initDB();
    Object.defineProperty(app.context, "models", {
        get() {
            return models;
        }
    });

    const handle = nextApp.getRequestHandler();
    Object.defineProperty(app.context, "nextJSHandler", {
        get() {
            return handle;
        }
    });

    await new Promise((resolve, reject) => {
        http.createServer(app.callback()).listen(port, host, err => {
            if (err) {
                reject(err);
            } else {
                console.info(`App started on ${port} bind to ${host}`);
                resolve(app);
            }
        });
    });
};
