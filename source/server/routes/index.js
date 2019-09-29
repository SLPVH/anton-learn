import Router from "koa-router";

const router = new Router();

export const publicRoutes = [/\/$/, /\/login$/, /\/user$/];

export const nextJSRouterPaths = /\/(_next|static)\/.*/i;

router
    .get("/login", async (ctx, next) => {
        await ctx.nextJSHandler(ctx.req, ctx.res);
        await next();
    })
    .post("/user", async (ctx, next) => {
        // TODO create token and generate spl address
        // TODO create and save toke
        await next();
    })
    .all(nextJSRouterPaths, async ctx => {
        await ctx.nextJSHandler(ctx.req, ctx.res);
    });

export default router;

