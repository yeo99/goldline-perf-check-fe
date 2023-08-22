import React from 'react'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import useAuth from '../../hooks/useAuth'

function Main() {
  const isAuthenticated = useAuth();
  if(!isAuthenticated) return null;
  
  return (
    <div className='main-page-contaier'>
        <span>메인 페이지(임시)</span>
    </div>
  )
}

export default Main