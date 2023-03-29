import { Container, Nav, Navbar, Image } from 'react-bootstrap'
import logo from './../logo.png';

function Header(props) {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home"><Image src={logo} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="#link">Info</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
