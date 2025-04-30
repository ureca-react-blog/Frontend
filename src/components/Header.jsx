import { NavLink, Link } from 'react-router-dom'
import css from './header.module.css'

export const Header = () => {
  return (
    <header className={css.header}>
      <h1>
        <Link to="/">SEHADANGLOG</Link>
      </h1>
      <nav>
        <NavLink to="/register">회원가입</NavLink>
      </nav>
    </header>
  )
}
