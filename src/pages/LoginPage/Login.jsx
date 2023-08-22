import React, { useState } from 'react'
import './Login.scss'
import LoginDeco from '../../components/LoginDeco/LoginDeco'
import { Link, useNavigate } from 'react-router-dom'
import { createAxios } from '../../api/axiosInstance'

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // 새로고침 방지
    try {
      const response = await createAxios.post('/login', {
        user_id: userId,
        user_password: password
      })
      navigate('/main')
    } catch (err) {
      // 서버에서 보낸 오류 메세지 설정
      setError(err.response.data.error)
    }
  }

  return (
    <div className='login-page-container'>
        <div className='login-page-wrap'>
            <div className='login-head'>로그인</div>
            <LoginDeco></LoginDeco>
            <form onSubmit={handleLogin}>
            <div className='login-form-wrap'>
              <div className='login-form-row'>
                <label htmlFor="id">아이디</label>
                <input placeholder="아이디를 입력해주세요" type='text' id="id"></input>
              </div>
              <div className='login-form-row'>
                <label htmlFor="password">비밀번호</label>
                <input placeholder="비밀번호를 입력해주세요" type='password' id="password"></input>
              </div>
            </div>
            <div className='login-buttons-wrap'>
              <div>
                <button type="submit" className='login-buttons'>로그인</button>
                <Link to="/register">
                  <button className='login-buttons'>회원가입</button>
                </Link>
              </div>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Login