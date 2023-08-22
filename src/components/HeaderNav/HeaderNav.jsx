import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import gimpoGoldlineLogo from '../../images/Gimpo-Goldline_logo-1.svg'
import'./HeaderNav.scss'

function BrandExample() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="" onClick={() => handleNavigation('/main')}>김포 골드라인 성능점검</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link> */}
              <NavDropdown title="평가 페이지" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => handleNavigation('/main/check')}>평가 작성</NavDropdown.Item>
                {/* <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
              </NavDropdown>
              <NavDropdown title="관리자 페이지" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">회원 검색</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">회원가입 승인</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">회원 관리</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">평가 결과 열람</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="회원 페이지" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">평가 기록 열람</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">개인정보 수정</NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;