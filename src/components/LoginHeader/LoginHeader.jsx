import React from 'react'
import './LoginHeader.scss'
import { createAxios } from '../../api/axiosInstance'
import { useNavigate } from 'react-router-dom'

const LoginHeader = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await createAxios.get('/logout');

            if (response.status === 200) {
                alert(response.data.message);
                navigate('/login')
            }
        } catch (error) {
            console.error('Logout failed: ', error)
            alert('로그아웃에 실패하였습니다. 다시 시도해주세요')
        }
    }

    return (
        <div className='login-header-container'>
            <div className='login-header-menu-wrap'>
                <a className='login-header-logout' onClick={handleLogout}>로그아웃</a>
            </div>
        </div>
    )
}

export default LoginHeader