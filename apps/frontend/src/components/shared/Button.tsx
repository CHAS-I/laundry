import type { ReactNode } from "react";
import clsx from 'clsx'

interface ButtonProps {
    children: ReactNode,
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function Button({ children, className, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className={clsx(
            "w-full flex justify-center py-3",
            className
        )}>
            {children}
        </button>
    )
}