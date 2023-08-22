import React from 'react'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import useAuth from '../../hooks/useAuth'
import './Main.scss'
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import { Container } from 'react-bootstrap';

function Main() {
  const isAuthenticated = useAuth();
  if(!isAuthenticated) return null;

  return (
    <div className='main-page-contaier'>
      <LoginHeader></LoginHeader>
      <HeaderNav></HeaderNav>
      <Container>
        <span>메인 페이지(임시)</span>
      </Container>
    </div>
  )
}

export default Main