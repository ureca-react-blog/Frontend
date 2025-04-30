import { useState } from 'react'
import { toast } from 'react-toastify'
import { Bounce } from 'react-toastify'
import css from './registerpage.module.css'
import axios from 'axios'

export const Registerpage = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [errorUserName, setErroruserName] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorPasswordCheck, setErrorPasswordCheck] = useState('')
  const [registerState, setRegisterState] = useState('')

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

  const validatePasswordCheck = (value, current = password) => {
    if (!value.trim()) {
      setErrorPasswordCheck('패스워드를 입력해주세요')
      return
    }
    if (value !== current) {
      setErrorPasswordCheck('패스워드가 일치하지 않습니다')
    } else {
      setErrorPasswordCheck('')
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

  const handlePasswordCheckChange = e => {
    const value = e.target.value
    setPasswordCheck(value)
    validatePasswordCheck(value)
  }

  const register = async e => {
    e.preventDefault()
    console.log(username, password, passwordCheck)
    validateUserName(username) // 제출 전 한번 더 유효성 검사
    validatePassword(password)
    validatePasswordCheck(passwordCheck)

    // 한번 더 보안
    if (
      errorUserName ||
      errorPassword ||
      errorPasswordCheck ||
      !username ||
      !password ||
      !passwordCheck
    )
      return

    try {
      setRegisterState('등록중')
      // 회원가입 API 호출 (DB에 사용자명과 비밀번호 저장)
      const response = await axios.post('http://localhost:3000/register', {
        username,
        password,
      })

      console.log('응답 상태 코드:', response.status)
      console.log('응답 내용:', response.data)

      toast.success('👏 회원가입 성공!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })

      setUserName('')
      setPassword('')
      setPasswordCheck('')

      setRegisterState('등록 완료')
    } catch (error) {
      console.error('응답 전체:', error)
      if (error.response) {
        console.error('응답 상태:', error.response.status)
        console.error('응답 데이터:', error.response.data)
        toast.error(`${error.response.data.message || '회원가입 실패'}`)
      } else {
        toast.error('서버에 연결할 수 없습니다')
      }
    }
  }

  return (
    <main className={css.registerpage}>
      <h2>회원가입 페이지</h2>
      <form className={css.container} onSubmit={register}>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          value={username}
          onChange={handleUserNameChange}
        ></input>
        <strong>{errorUserName}</strong>
        <input
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <strong>{errorPassword}</strong>
        <input
          type="password"
          placeholder="패스워드를 재입력해주세요"
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
        ></input>
        <strong>{errorPasswordCheck}</strong>
        <button type="submit">가입하기</button>
      </form>
    </main>
  )
}
