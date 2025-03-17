import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { useField } from "../../hooks/useField";
import { validateUser } from "@laundry/types";
import { useState } from "react";

interface LoginErrors {
    userName: Array<string>
    password: Array<string>
}

export function LoginForm() {
    const [errors, setErrors] = useState<Partial<LoginErrors>>({})

    const userName = useField({ type: "text" })
    const password = useField({ type: "password" })

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const result = validateUser({ userName: userName.value, password: password.value })
        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors)
            return
        }
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({
                userName: userName.value,
                password: password.value
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        // const data = await response.json()
        // console.log(data)
        if (response.status === 200) window.location.href = '/dashboard'
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 items-center">
            <div className="flex flex-col w-full">
                <div className="flex flex-col gap-2 mb-5">
                    <label htmlFor="" className="text-sm font-medium">
                        Nombre de usuario
                    </label>
                    <Input field={userName} placeholder="nombre de usuario" errorMessage={errors?.userName && errors.userName[0]} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-sm font-medium">
                        Constraseña
                    </label>
                    <Input field={password} placeholder="••••••••" errorMessage={errors?.password && errors.password[0]} />
                </div>
            </div>
            <span className="text-sm text-[#00B0F0] font-medium">
                ¿Olvido su contraseña?
            </span>
            <Button className={"rounded-md bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm"}>
                Inciar sesión
            </Button>
        </form>
    )
}