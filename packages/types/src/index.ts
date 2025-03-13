import { z } from 'zod'

export const UserSchema = z.object({
    userName: z.string(),
    password: z.string()
})

export type User = z.infer<typeof UserSchema>