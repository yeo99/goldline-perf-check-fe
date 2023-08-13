import React from 'react'
import LoginDeco from '../../components/LoginDeco/LoginDeco'
import './Register.scss'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='register-page-container'>
        <div className='login-page-wrap'>
            <div className='login-head'>회원가입</div>
            <LoginDeco></LoginDeco>
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
                <button className='login-buttons'>로그인</button>
                <Link to="/register">
                  <button className='login-buttons'>회원가입</button>
                </Link>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Register