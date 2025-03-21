import { User, validateUser } from "@laundry/types";
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from "../config.js";
import { pool } from "../db.js";
import { NotFoundError, ValidationError } from "../errors.js";

export class UserModel {
    static async create({ userName, password }: User) {
        const result = validateUser({ userName, password })
        if (!result.success) throw new ValidationError(JSON.stringify(result.error.flatten().fieldErrors));

        const fetchUserQuery = {
            name: 'fetch-user',
            text: 'SELECT user_name FROM users WHERE user_name = $1',
            values: [userName]
        }
        const userExists = await pool.query(fetchUserQuery)
        if (userExists.rowCount! > 0) throw new ValidationError('Usuario ya existente')

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        const insertUserQuery = {
            name: 'insert-user',
            text: 'INSERT INTO users(user_name, password) VALUES($1, $2)',
            values: [userName, hashedPassword]
        }

        await pool.query(insertUserQuery)

        const userIdQuery = {
            name: 'fetch-id',
            text: 'SELECT id FROM users WHERE user_name = $1',
            values: [userName]
        }

        const userId = await pool.query(userIdQuery)

        return { id: userId.rows[0].id, message: "Usuario creado con éxito" }
    }

    static async login({ userName, password }: User) {
        const result = validateUser({ userName, password })
        if (!result.success) throw new ValidationError(JSON.stringify(result.error.flatten().fieldErrors));

        const fetchUserQuery = {
            name: 'fetch-user',
            text: 'SELECT id, user_name, password FROM users WHERE user_name = $1',
            values: [userName]
        }
        const userExists = await pool.query(fetchUserQuery)
        if (userExists.rowCount! <= 0) throw new NotFoundError(`Usuario ${userName} no existe`)

        const user = userExists.rows[0]
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) throw new ValidationError("Contraseña incorrecta")

        return { id: user.id, userName: user.user_name }
    }
}