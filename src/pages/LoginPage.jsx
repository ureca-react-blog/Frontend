import { useState } from 'react'
import { toast } from 'react-toastify'
import { Bounce } from 'react-toastify'
import axios from 'axios'
import css from './registerpage.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../store/userSlice'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorUserName, setErroruserName] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('') // 로그인 상태
  const [redirect, setRedirect] = useState(false) // 로그인 상태 메시지
  const navigate = useNavigate()

  const validateUserName = value => {
    if (!value.trim()) {
      setErroruserName('사용자명을 입력해주세요')
      return
    }
    if (!/^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(value)) {
      setErroruserName(
        '사용자명은 4자 이상이어야 하며 영어로 시작해야 합니다. 공백은 입력할 수 없습니다'
      )
    } else {
      setErroruserName('')
    }
  }

  const validatePassword = value => {
    if (!value.trim()) {
      setErrorPassword('패스워드를 입력해주세요')
      return
    }
    if (value.length < 4) {
      setErrorPassword('패스워드는 4자 이상이어야 합니다.')
    } else {
      setErrorPassword('')
    }
  }

  const handleUserNameChange = e => {
    const value = e.target.value
    setUserName(value)
    validateUserName(value)
  }

  const handlePasswordChange = e => {
    const value = e.target.value
    setPassword(value)
    validatePassword(value)
  }

  const login = async e => {
    e.preventDefault() // form의 기본적인 특징인 새로고침 방지
    setLoginStatus('')
    validateUserName(username)
    validatePassword(password)

    if (errorPassword || errorUserName || !username || !password) {
      setLoginStatus('아이디와 패스워드를 확인하세요')
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/login', { username, password })

      console.log(response)

      toast.success('다시 오신 것을 환영합니다!🤗 ', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })

      if (response.status == 200) {
        setLoginStatus('로그인 성공')
        dispatch(setUserInfo(response.data)) // 스토어에 로그인 정보 저장
        setTimeout(() => {
          setRedirect(true)
        }, 1000)
      }
    } catch (error) {
      console.error('응답 전체:', error)
      if (error.response) {
        console.error('응답 상태:', error.response.status)
        console.error('응답 데이터:', error.response.data)
      } else {
        console.error('서버에 연결할 수 없습니다')
        toast.error('서버에 연결할 수 없습니다')
      }
    } finally {
      setLoginStatus(false)
    }
  }

  if (redirect) {
    navigate('/')
  }

  return (
    <main className={css.loginpage}>
      <h2 className={css.title}>로그인</h2>
      {loginStatus && <strong>로그인 성공</strong>}
      <form className={css.container} onSubmit={login}>
        <input
          type="text"
          placeholder="사용자명을 입력해주세요"
          value={username}
          onChange={handleUserNameChange}
        />
        <strong>{errorUserName}</strong>
        <input
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={password}
          onChange={handlePasswordChange}
        />
        <strong>{errorPassword}</strong>
        <button type="submit">로그인</button>
      </form>
    </main>
  )
}
