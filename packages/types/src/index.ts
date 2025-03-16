import { z } from 'zod'

export const UserSchema = z.object({
    userName: z.string({
        message: "Nombre de usuario es obligatorio"
    }),
    password: z.string({
        message: "Contraseña es obligatoria"
    }).min(8, "La contraseña debe de tener al menos 8 caracteres")
})

export type User = z.infer<typeof UserSchema>

export function validateUser(object: any) {
    return UserSchema.safeParse(object)
}

export function validatePartialUser(object: any) {
    return UserSchema.partial().safeParse(object)
}