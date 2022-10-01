import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Layout = () => {
  return (
    <Navbar style={{marginBottom: 15}} bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">E-Report</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/lecturer">Lecturer</Nav.Link>
            <Nav.Link href="/city">City</Nav.Link>
            <Nav.Link href="/course">Course</Nav.Link>
            <Nav.Link href="/class">Class</Nav.Link>
            <Nav.Link href="/student">Student</Nav.Link>
            <Nav.Link href="/score">Score</Nav.Link>
            <Nav.Link href="/ipk">IPK</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Username" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default Layout