import { cn } from '@/lib/utils'

interface InputFieldProps {
  fieldName: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

export const InputField = ({ fieldName, inputProps }: InputFieldProps) => {
  const id = crypto.randomUUID()
  return (
    <div className={cn(['flex', 'flex-col', 'space-y-3'])}>
      <label className={cn(['font-semibold'])} htmlFor={id}>{fieldName}</label>
      <input className={cn(['border', 'px-1', 'py-2', 'border-slate-700', 'dark:bg-slate-950', 'dark:text-white'])} {...inputProps} id={id} />
    </div>
  )
}