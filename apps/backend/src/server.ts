import express from 'express'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserModel } from './models/user.js'
import { errorHandler, isLoggedIn } from './middleware.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(cors({
    origin: 'http://localhost:4321',
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
    credentials: true
}))
app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser())
app.use(isLoggedIn)
app.post('/', async (req, res, next) => {
    try {
        const result = await UserModel.create(req.body)
        res.status(201).send(result)
    } catch (error) {
        next(error)
    }
})
app.post('/login', async (req, res, next) => {
    try {
        const user = await UserModel.login(req.body)
        const token = jwt.sign(
            { id: user.id, userName: user.userName },
            SECRET_JWT_KEY!,
            {
                expiresIn: '1h'
            }
        )
        res
            .status(200)
            .cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })
            .send(user)
    } catch (error) {
        next(error)
    }
})

app.post('/logout', (_req, res) => {
    res.clearCookie('access_token').json({ message: "Sesión cerrada exitosamente" })
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})