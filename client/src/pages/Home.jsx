import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Layout from './Layout/Layout'
import Container from 'react-bootstrap/esm/Container'

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

      <Container>
        <h1 style={{textAlign: 'center'}}>Home Page</h1>
        <hr/>
        <h1>Welcome Back {user.name}</h1>
      </Container>
    </>
  )
}

export default Home