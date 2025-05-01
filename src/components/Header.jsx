import { NavLink, Link } from 'react-router-dom'
import css from './header.module.css'
import { useSelector } from 'react-redux'

export const Header = () => {
  const { username } = useSelector(state => state.user.user)
  console.log(username)

  return (
    <header className={css.header}>
      <h1>
        <Link to="/">SEHADANGLOG</Link>
      </h1>
      <nav>
        {username ? (
          <>
            <button>글쓰기</button>
            <button>로그아웃</button>
            <span>{username}</span>
          </>
        ) : (
          <>
            <MenuLink to="/register" label="회원가입" />
            <MenuLink to="/login" label="로그인" />
          </>
        )}
      </nav>
    </header>
  )
}

const MenuLink = ({ to, label }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? css.active : '')}>
    {label}
  </NavLink>
)
