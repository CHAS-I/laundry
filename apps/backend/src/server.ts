import express from 'express'
import { User, UserSchema } from '@laundry/types'

const app = express()

const port = 3000

app.get('/', (_req, res) => {
    const user: User = {
        userName: "Hola",
        password: "askldjflkasjdkfl"
    }

    const result = UserSchema.safeParse(user)

    res.send(result)
})


app.listen(port, () => {
    console.log('App listening on port 3000')
})