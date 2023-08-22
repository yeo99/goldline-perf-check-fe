import React from 'react'
import './Login.scss'
import LoginDeco from '../../components/LoginDeco/LoginDeco'
import { Link, useNavigate } from 'react-router-dom'
import { createAxios } from '../../api/axiosInstance'
import { useForm, checkEmptyFields } from '../../utils/formUtils'

function Login() {
  const navigate = useNavigate();

  const { formData, handleInputChange } = useForm({
    user_id: '',
    user_password: ''
  });

  // 검증이 필요한 빈 폼
  const requiredFields = [
    { key: "user_id", label: "아이디" },
    { key: "user_password", label: "비밀번호" },
  ]

  const handleLogin = async (e) => {
    e.preventDefault();
    const errorMsg = checkEmptyFields(formData, requiredFields);
    if (errorMsg) { alert(errorMsg); return; }
    try {
      const response = await createAxios.post('/login', formData);
      navigate('/main')
    } catch (err) {
      alert(err.response.data.error)
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
                <label htmlFor="user_id">아이디</label>
                <input
                  placeholder="아이디를 입력해주세요"
                  type='text'
                  id="user_id"
                  value={formData.user_id || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className='login-form-row'>
                <label htmlFor="user_password">비밀번호</label>
                <input
                  placeholder="비밀번호를 입력해주세요"
                  type='password'
                  id="user_password"
                  value={formData.user_password || ""}
                  onChange={handleInputChange}
                />
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