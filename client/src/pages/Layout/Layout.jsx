import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image'


const Layout = ({ name }) => {

  const url = 'http://localhost:3000/'

  const navigate = useNavigate()

  const logout = async () => {
    try {
      await axios.delete(`${url}users/logout`)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Navbar style={{ marginBottom: 15 }} bg="black" variant="dark" expand="lg">
      <Container>
        <Image style={{ width: 30, height: 30, marginRight: 10 }}
          src=
          "/picture/logo.png"
          rounded
        />

        <Navbar.Brand href="/">E-Report</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/lecturer">Lecturer</Nav.Link>
            {/* <Nav.Link href="/city">City</Nav.Link> */}
            <Nav.Link href="/course">Course</Nav.Link>
            <Nav.Link href="/class">Class</Nav.Link>
            <Nav.Link href="/student">Student</Nav.Link>
            <Nav.Link href="/score">Score</Nav.Link>
            <Nav.Link href="/ipk">IPK</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={name} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
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