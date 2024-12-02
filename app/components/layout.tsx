import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className='h-screen w-screen bg-slate-800 text-white flex flex-col items-center justify-center'>
      <Outlet />
    </div>
  )
}
