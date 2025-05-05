import { NavLink, Link, useNavigate } from 'react-router-dom'
import css from './header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setUserInfo } from '../store/userSlice'
import { getUserProfile } from '../apis/userApi'
import { logoutUser } from '../apis/userApi'

export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.user)
  const username = user?.username
  console.log(username)

  useEffect(() => {
    const getProfile = async () => {
      // 서버에 get 요청
      try {
        const userData = await getUserProfile() // 사용자 정보 가져오기
        dispatch(setUserInfo(userData))
      } catch (error) {
        console.log('에러 전체', error)
        dispatch(setUserInfo(''))
      }
    }
    getProfile()
  }, [dispatch])

  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch(setUserInfo(''))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className={css.header}>
      <h1>
        <Link to="/">SEHADANGLOG</Link>
      </h1>
      <nav>
        {username ? (
          <>
            <MenuLink to="/create" label="글쓰기" />
            <button onClick={handleLogout}>로그아웃</button>
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
