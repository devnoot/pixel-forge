import { createBrowserRouter } from 'react-router-dom'

import { Home } from '@/pages/home/home.tsx'
import { Layout } from '@/components/layout.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
])
