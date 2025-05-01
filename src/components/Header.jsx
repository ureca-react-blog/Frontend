import { NavLink, Link } from 'react-router-dom'
import css from './header.module.css'

export const Header = () => {
  return (
    <header className={css.header}>
      <h1>
        <Link to="/">SEHADANGLOG</Link>
      </h1>
      <nav>
        <MenuLink to="/register" label="회원가입" />
        <MenuLink to="/login" label="로그인" />
      </nav>
    </header>
  )
}

const MenuLink = ({ to, label }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? css.active : '')}>
    {label}
  </NavLink>
)
