import React from 'react'
import LoginDeco from '../../components/LoginDeco/LoginDeco'
import './Register.scss'
import { useNavigate } from 'react-router-dom';
import { useForm, checkEmptyFields } from '../../utils/formUtils';
import { createAxios } from '../../api/axiosInstance';

function Register() {
  // custom hook
  const { formData, setFormData, handleInputChange } = useForm({
    user_id: "",
    user_name: "",
    user_email: "",
    user_cellphone: "",
    user_charge: "",
    user_birth_date: "",
    user_company: "",
    is_admin: "0",
  });

  // 검증이 필요한 빈 폼
  const requiredFields = [
    { key: "user_id", label: "아이디" },
    { key: "user_password", label: "비밀번호" },
    { key: "user_name", label: "이름" },
    { key: "user_email", label: "이메일 주소" },
    { key: "user_cellphone", label: "전화번호" },
    { key: "user_charge", label: "담당 대분류" },
    { key: "user_birth_date", label: "생년월일" },
    // 아직은 nullable 취급이라 검증에서 제외
    // { key: "user_company", label: "사명" },
  ]

  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    const errorMsg = checkEmptyFields(formData, requiredFields);
    if (errorMsg) { alert(errorMsg); return; }
    try {
      const response = await createAxios.post('/register', formData)
      if (response.status === 200 || response.status === 201) {
        alert(response.data.message)
        navigate('/login')
      }
    } catch (error) {
      let errorMessage = error.response.data.error;
      if (!errorMessage) {
        errorMessage = "회원가입 중 알 수 없는 오류가 발생했습니다. 다시 시도해주세요"
      }
      alert(errorMessage);
    }
  }

  return (
    <div className='register-page-container'>
      <div className='register-page-wrap'>
        <div className='register-head'>회원가입</div>
        <LoginDeco></LoginDeco>
        <div className='register-form-wrap'>
          <form onSubmit={handleRegister}>
            <div className='register-form-row'>
              <label htmlFor="user_id">아이디</label>
              <input
                placeholder="아이디를 입력해주세요"
                type='text'
                id="user_id"
                value={formData.user_id || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className='register-form-row'>
              <label htmlFor="user_password">비밀번호</label>
              <input
                placeholder="비밀번호를 입력해주세요"
                type='password'
                id="user_password"
                value={formData.user_password || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className='register-form-row'>
              <label htmlFor="user_name">이름</label>
              <input
                placeholder="이름을 입력해주세요"
                type='text'
                id="user_name"
                value={formData.user_name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className='register-form-row'>
              <label htmlFor="user_email">이메일 주소</label>
              <input
                placeholder="이메일 주소를 입력해주세요"
                type='text'
                id="user_email"
                value={formData.user_email || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className='register-form-row'>
              <label htmlFor="user_cellphone">전화번호</label>
              <input
                placeholder="전화번호를 입력해주세요"
                type='text'
                id="user_cellphone"
                value={formData.user_cellphone}
                onChange={handleInputChange}
              />
            </div>
            <div className='register-form-row'>
              <label htmlFor="user_charge">담당 대분류</label>
              <select
                name='user_charge'
                id="user_charge"
                value={formData.user_charge || ""}
                onChange={handleInputChange}
              >
                <option value='' disabled selected>선택해주세요</option>
                <option value='A000'>구조물</option>
                <option value='B000'>궤도시설</option>
                <option value='C000'>건축물</option>
                <option value='D000'>전철전력설비</option>
                <option value='E000'>신호제어설비</option>
              </select>
            </div>
            <div className='register-form-row'>
              <label htmlFor="user_birth_date">생년월일</label>
              <input
                placeholder="YYYY-MM-DD 형식으로 입력해주세요"
                type='text'
                id="user_birth_date"
                value={formData.user_birth_date || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className='register-form-row'>
              <label htmlFor="user_company">사명</label>
              <input
                placeholder="재직중인 사명을 입력해주세요"
                type='text'
                id="user_company"
                value={formData.user_company || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className='register-buttons-wrap'>
              <div>
                <button type="submit" className='register-buttons'>회원가입</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register