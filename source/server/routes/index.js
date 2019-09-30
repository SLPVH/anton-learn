import Router from "koa-router";
import { createUserController, getAllUserInformation } from "../controllers/users";

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
            ctx.request.body.password,
            ctx.models.userQuestionsModel
        );
        ctx.body =  { token };
        await next();
    })
    .get("/profile", async (ctx, next) => {
        await ctx.nextJSHandler(ctx.req, ctx.res);
        await next();
    })
    .get("/load-all", async (ctx, next) => {
        const { id: userId } = ctx.state.jwtData;
        console.log("/load-all", ctx.state.jwtData);
        if (userId) {
            ctx.body = await getAllUserInformation(
                ctx.models.usersModel,
                ctx.models.userQuestionsModel,
                userId
            );
        }
        await next();
    })
    .all(nextJSRouterPaths, async ctx => {
        await ctx.nextJSHandler(ctx.req, ctx.res);
    });

export default router;

