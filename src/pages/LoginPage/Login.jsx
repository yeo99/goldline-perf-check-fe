import React from 'react'
import './Login.scss'

function login() {
  return (
    <div className='login-page-container'>
        <div className='login-page-wrap'>
            <div className='login-head'>로그인</div>
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
                <button className='login-buttons'>회원가입</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default login