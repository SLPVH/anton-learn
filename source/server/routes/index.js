import Router from "koa-router";
import { createUserController } from "../controllers/users";

const router = new Router();

export const publicRoutes = [/\/$/, /\/login$/, /\/user$/];

export const nextJSRouterPaths = /\/(_next|static)\/.*/i;

router
    .get("/login", async (ctx, next) => {
        await ctx.nextJSHandler(ctx.req, ctx.res);
        await next();
    })
    .post("/user", async (ctx, next) => {
        const { token } = await createUserController(
            ctx.models.usersModel,
            ctx.request.body.login,
            ctx.request.body.password
        );
        ctx.body =  { token };
        await next();
    })
    .get("/profile", async (ctx, next) => {
        await ctx.nextJSHandler(ctx.req, ctx.res);
        await next();
    })
    .all(nextJSRouterPaths, async ctx => {
        await ctx.nextJSHandler(ctx.req, ctx.res);
    });

export default router;

