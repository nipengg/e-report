import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Container from 'react-bootstrap/esm/Container'
import Footer from '../Layout/Footer'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './home.css';

const Home = () => {

  const url = 'http://localhost:3000/'

  const navigate = useNavigate()

  const [user, setUser] = useState([])
  const [token, setToken] = useState('')

  useEffect(() => {
    refreshToken()
  }, [])

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${url}users/token`)

      if (response) {
        setToken(response.data.accessToken)
        const decoded = jwt_decode(response.data.accessToken)
        setUser(decoded)
      }

    } catch (error) {
      navigate('/login')
      console.log(error.response.data.message)
    }
  }

  return (
    <>
      <Layout name={user.name} />

      <Container style={{ height: "108vh" }}>
        <h1 style={{ textAlign: 'center' }}>Welcome Back {user.name}</h1>
        <hr />
        <Row className="justify-content-md-center">
          <Col md="auto" xs="auto" lg="auto">
            <Card style={{ width: '18rem' }}>
              <Card.Img style={{ width: "180px", height: "130px" }} className="center" variant="top" src="/picture/lecturer.png" />
              <Card.Body>
                <Card.Title>Lecturer</Card.Title>
                <Card.Text>
                  Go here to view the personal data of the lecturer
                </Card.Text>
                <a href="//localhost:3001/lecturer">
                  <Button variant="primary">Go</Button>
                </a>
              </Card.Body>
            </Card>
          </Col>
          <Col md="auto" xs="auto" lg="auto">
            <Card style={{ width: '18rem' }}>
              <Card.Img style={{ width: "180px", height: "130px" }} className="center" variant="top" src="/picture/courses.png" />
              <Card.Body>
                <Card.Title>Course</Card.Title>
                <Card.Text>
                  Go here to view Name of major, Total SCU, Total attendance
                </Card.Text>
                <a href="//localhost:3001/course">
                  <Button variant="primary">Go</Button>
                </a>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
        <br />
        <Row className="justify-content-md-center">
        <Col md="auto" xs="auto" lg="auto">
            <Card style={{ width: '18rem' }}>
              <Card.Img style={{ width: "180px", height: "130px" }} className="center" variant="top" src="/picture/class.png" />
              <Card.Body>
                <Card.Title>Class</Card.Title>
                <Card.Text>
                  Go here to view Class name, Total Student, and edit
                </Card.Text>
                <a href = "//localhost:3001/class">
                <Button variant="primary">Go</Button>
                </a>
              </Card.Body>
            </Card>
          </Col>
          <Col md="auto" xs="auto" lg="auto">
            <Card style={{ width: '18rem' }}>
              <Card.Img style={{ width: "180px", height: "130px" }} className="center" variant="top" src="/picture/student.png" />
              <Card.Body>
                <Card.Title>Student</Card.Title>
                <Card.Text>
                 Go here to view Student personal data
                </Card.Text>
                <a href = "//localhost:3001/student">
                <Button variant="primary">Go</Button>
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default Home