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
