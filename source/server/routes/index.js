import Router from "koa-router";
import {
    addFreePoints,
    createUserController,
    getAllUserInformation,
    makeAnswer
} from "../controllers/users";
import { sendTokens } from "../../slpHelper";

const router = new Router();

export const publicRoutes = [/\/$/, /\/login$/, /\/user$/];

export const nextJSRouterPaths = /\/(_next|static)\/.*/i;

router
    .get("/login", async (ctx, next) => {
        const { id: userId } = ctx.state.jwtData || { id: 0 };
        if (userId && (await ctx.models.usersModel.getUserById(userId))) {
            ctx.redirect("/profile");
        } else {
            await ctx.nextJSHandler(ctx.req, ctx.res);
        }
        await next();
    })
    .post("/user", async (ctx, next) => {
        const { token } = await createUserController(
            ctx.models.usersModel,
            ctx.request.body.login,
            ctx.request.body.password,
            ctx.models.userQuestionsModel
        );
        ctx.body = { token };
        await next();
    })
    .get("/profile", async (ctx, next) => {
        const { id: userId } = ctx.state.jwtData;
        if (userId && !(await ctx.models.usersModel.getUserById(userId))) {
            ctx.redirect("/login");
        } else {
            await ctx.nextJSHandler(ctx.req, ctx.res);
        }
        await next();
    })
    .get("/load-all", async (ctx, next) => {
        const { id: userId } = ctx.state.jwtData;
        if (userId) {
            ctx.body = await getAllUserInformation(
                ctx.models.usersModel,
                ctx.models.userQuestionsModel,
                userId
            );
        }
        await next();
    })
    .post("/answer", async (ctx, next) => {
        const { id: userId } = ctx.state.jwtData;
        if (userId) {
            await makeAnswer(
                ctx.models.userQuestionsModel,
                userId,
                ctx.request.body.questionId,
                ctx.request.body.answerId
            );
            ctx.body = { ok: 1 };
        }
        await next();
    })
    .post("/free-points", async (ctx, next) => {
        const { id: userId } = ctx.state.jwtData;
        if (userId) {
            await addFreePoints(
                ctx.models.usersModel,
                userId
            );
            ctx.body = { ok: 1 };
        }
        await next();
    })
    .post("/withdraw", async (ctx, next) => {
        const { id: userId } = ctx.state.jwtData;
        if (userId) {
            try {
                const { points } = ctx.models.usersModel.getUserById(userId);
                // FIXME
                await sendTokens(null, points, ctx.request.body.slpAddress, null);
                await ctx.models.usersModel.addFreePoints(userId, -points);
            } catch (e) {
                console.error(err);
            }
            ctx.body = { ok: 1 };
        }
        await next();
    })
    .all(nextJSRouterPaths, async ctx => {
        await ctx.nextJSHandler(ctx.req, ctx.res);
    });

export default router;
