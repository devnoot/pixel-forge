import { cn } from "@/lib/utils"

interface ButtonProps {
  label: string;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({ label, buttonProps }) => {
  return (
    <button className={cn(['border', 'font-bold', 'px-3', 'py-2', 'dark:bg-slate-950', 'dark:text-white'])} {...buttonProps}>
      {label}
    </button>
  )
}