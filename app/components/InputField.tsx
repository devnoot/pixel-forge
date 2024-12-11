import { cn } from '@/lib/utils'

export const InputField = ({ fieldName, inputProps }) => {
  const id = crypto.randomUUID()
  return (
    <div className={cn(['flex', 'flex-col', 'space-y-3'])}>
      <label className={cn(['font-semibold'])} htmlFor={id}>{fieldName}</label>
      <input className={cn(['border', 'px-1', 'py-2', 'border-slate-700', 'dark:bg-slate-950', 'dark:text-white'])} {...inputProps} id={id} />
    </div>
  )
}