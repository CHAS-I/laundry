import { pool } from "../db.js";
import { NotFoundError, ValidationError } from "../errors.js";
import { validateEmployee } from '@laundry/types'
export class EmployeeModel {

    static async findMany() {
        const query = {
            name: "fetch-all",
            text: "SELECT e.id, first_name, last_name, phone_number, e.created_at, r.role FROM employees AS e JOIN users AS u ON e.user_id = u.id JOIN user_roles AS ur ON u.id = ur.user_id JOIN roles AS r ON ur.role_id = r.id"
        }

        const response = await pool.query(query)

        return response.rows
    }
    static async findFirst({ id }: { id: string }) {
        const query = {
            name: "fetch-one",
            text: "SELECT e.id, first_name, last_name, phone_number, e.created_at, r.role FROM employees AS e JOIN users AS u ON e.user_id = u.id JOIN user_roles AS ur ON u.id = ur.user_id JOIN roles AS r ON ur.role_id = r.id WHERE e.id = $1",
            values: [id]
        }
        try {
            const response = await pool.query(query)

            if (response.rowCount! <= 0) throw new NotFoundError("Empleado no encontrado")

            return response.rows[0]

        } catch (error) {
            throw new ValidationError('ID no válido')
        }
    }

    static async create({ firstName, lastName, phoneNumber, userId, roleId }: { firstName: string, lastName: string, phoneNumber: string, userId: string, roleId: string }) {
        console.log(firstName)
        const result = validateEmployee({ firstName, lastName, phoneNumber, userId })
        if (!result.success) throw new ValidationError(JSON.stringify(result.error.flatten().fieldErrors))

        const roleQuery = {
            name: 'fetch-role',
            text: 'SELECT id FROM roles WHERE id = $1',
            values: [roleId]
        }
        const roleExists = await pool.query(roleQuery)

        if (roleExists.rowCount! <= 0) throw new NotFoundError(`Rol con el id ${roleId} no existe`)

        const userQuery = {
            name: 'fetch-user',
            text: 'SELECT id FROM users WHERE id = $1',
            values: [userId]
        }

        const userExists = await pool.query(userQuery)

        if (userExists.rowCount! <= 0) throw new NotFoundError(`Usuario con el id ${userId} no existe`)

        const employeeQuery = {
            name: 'insert-employee',
            text: 'INSERT INTO employees(first_name, last_name, phone_number, user_id) VALUES ($1, $2, $3, $4)',
            values: [firstName, lastName, phoneNumber, userId]
        }
        const userRoleQuery = {
            name: 'insert-userRole',
            text: 'INSERT INTO user_roles(user_id, role_id) VALUES ($1, $2)',
            values: [userId, roleId]
        }

        await pool.query(employeeQuery)
        await pool.query(userRoleQuery)

        return { message: "Empleado creado correctamente" }
    }
}