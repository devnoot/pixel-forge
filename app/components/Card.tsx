import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export const Card  = ({ children }: { children: ReactNode }) => {
    return (
        <div className={cn(['border', 'p-5', 'dark:border-slate-500'])}>
            {children}
        </div>
    )
}