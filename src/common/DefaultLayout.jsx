import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import css from './defaultlayout.module.css'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const DefaultLayout = () => {
  return (
    <div className={css.defaultlayout}>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}
