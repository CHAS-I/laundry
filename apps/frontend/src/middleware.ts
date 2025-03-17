import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
    if (context.url.pathname === '/signin') {
        return next()
    }
    const accessToken = context.cookies.get('access_token')
    if (!accessToken) return Response.redirect(new URL('/signin', context.url), 302)

    return next()
})