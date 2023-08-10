import React from 'react'
import './LoginHeader.scss'
import { getRailwaySection } from '../../api/railway-info/getRailway'

const LoginHeader = () => {
  return (
    <div className='login-header-container'>
        <div className='login-header-menu-wrap'>
            <a className='login-header-logout'>로그아웃</a>
        </div>
        <button onClick={ RailwaySection }>
            버튼
        </button>
    </div>
  )
}

const RailwaySection = async () => {
    try {
        const result = await getRailwaySection()
        console.log(result)
    } catch (error) {
        alert(error.message)
    }
}
export default LoginHeader