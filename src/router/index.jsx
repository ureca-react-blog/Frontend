import { createBrowserRouter } from 'react-router-dom'
import { DefaultLayout } from '../common/DefaultLayout'
import { Registerpage } from '../pages/Registerpage'
import { LoginPage } from '../pages/LoginPage'
import { CreatePost } from '../pages/CreatePost'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <div>에러</div>,
    children: [
      { index: true, element: <div>메인페이지</div> },
      { path: '/register', element: <Registerpage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/create', element: <CreatePost /> },
    ],
  },
])
