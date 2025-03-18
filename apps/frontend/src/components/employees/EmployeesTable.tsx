import { useState } from "react"
import { Button } from "../shared/Button"
import clsx from "clsx"

function Tabs({ options, current_view, setView }: { options: Array<string>, current_view: string, setView: (s: string) => void }) {
    return (
        <div className="inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500 mb-4 w-fit">
            {options.map(option => (
                <div onClick={() => setView(option)} className={clsx(
                    current_view === option ? 'bg-white text-black shadow-sm' : "bg-slate-100 text-slate-500",
                    "rounded-sm text-sm font-medium py-1.5 px-3 cursor-pointer transition-colors"
                )}>
                    {option}
                </div>
            ))}
        </div>

    )
}

export function EmployeesTable() {
    const [view, setView] = useState('Tabla')
    return (
        <>
            <Tabs options={['Tabla', 'Tarjetas']} setView={setView} current_view={view} />
            <div className="rounded-md border border-[#E2E8F0]">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b-[#E2E8F0] bg-slate-100/50">
                            <tr className="border-b border-b-[#E2E8F0] transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-500">
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0">
                                    Empleado
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0">
                                    Contacto
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0">
                                    Rol
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0">
                                    Fecha de contratación
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}