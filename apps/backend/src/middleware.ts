import { ApiError } from './errors.js'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({ error: err.message })
        return
    }
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' })
}

export const isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
    const pathname = req.path
    const token = req.cookies.access_token
    console.log(pathname, token)
    if (!token && pathname != '/login') res.status(403).send('Access not authorized')

    return next()
}