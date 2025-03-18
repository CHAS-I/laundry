import type { ReactNode } from "react";
import clsx from 'clsx'

interface ButtonProps {
    children: ReactNode,
    className?: string,
    onClick?: (param?: any) => void
}

export function Button({ children, className, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className={clsx(
            "w-full flex justify-center py-3 items-center rounded-md px-4 cursor-pointer transition-colors",
            className
        )}>
            {children}
        </button>
    )
}