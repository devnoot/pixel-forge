import { cn } from '@/lib/utils'

export const Home = () => {
  return (
    <div
      className={cn(
        'h-screen',
        'w-screen',
        'max-w-screen',
        'min-h-screen',
        'flex',
        'flex-col',
        'bg-gray-50',
        'dark:bg-slate-800',
        'text-black',
        'dark:text-white',
        'justify-center',
        'items-center'
      )}
    >
      <h1 className={cn('text-4xl')}>nootstack</h1>
    </div>
  )
}
