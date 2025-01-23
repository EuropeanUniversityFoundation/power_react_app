import { Container, Nav, Navbar } from 'react-bootstrap'

function Header() {

  return (
    <Navbar aria-label="Main menu" id="navbar-main" expand="md">
      <Container>
        <Navbar.Brand href="#" title="Home" rel="home">
          <img src="https://power.uni-foundation.eu/themes/custom/power_theme/power_logo_singleline.png" alt="Home" className="img-fluid d-inline-block align-top" />
          <span className="ml-2 d-none">POWER project</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="CollapsingNavbar" />
        <Navbar.Collapse className="justify-content-end" id="CollapsingNavbar">
          <Nav role="navigation" aria-labelledby="main-menu" id="main-menu">

            <h2 className="d-none sr-only" id="main-menu-title">Main navigation</h2>

            <Nav.Link href="https://power-placements.eu/" target="_blank" rel="noreferrer">POWER project</Nav.Link>
            <Nav.Link href="https://power.uni-foundation.eu" target="_blank" rel="noreferrer">Placement platform</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
