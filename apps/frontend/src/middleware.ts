import { defineMiddleware } from "astro:middleware";
import { SECRET_JWT_KEY } from "../config";
import jwt from "jsonwebtoken";

export const onRequest = defineMiddleware((context, next) => {
    if (context.url.pathname === '/signin') {
        return next()
    }
    const accessToken = context.cookies.get('access_token')
    if (!accessToken) return Response.redirect(new URL('/signin', context.url), 302)
    try {
        const data = jwt.verify(accessToken.value, SECRET_JWT_KEY!)
        context.locals.user = data as { userName: string, id: string }
        return next()
    } catch {
        return Response.redirect(new URL('/signin', context.url), 302)
    }
})