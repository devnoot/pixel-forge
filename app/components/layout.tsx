import { cn } from '@/lib/utils'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className={cn(['h-screen w-screen', 'dark:bg-slate-900', 'dark:text-white'])}>
      <Outlet />
    </div>
  )
}
