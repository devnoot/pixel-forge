import { cn } from "@/lib/utils"

export const Button = ({ label, buttonProps }) => {
  return (
    <button className={cn(['border', 'font-bold', 'px-3', 'py-2', 'dark:bg-slate-950', 'dark:text-white'])} {...buttonProps}>
      {label}
    </button>
  )
}