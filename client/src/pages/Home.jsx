import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const url = 'http://127.0.0.1:3000/'

  const [name, setName] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    refreshToken()
  }, [])


  const refreshToken = async () => {
    try {
      const response = await axios.get(`${url}users/token`)
      setToken(response.data.accessToken)
      const decoded = jwt_decode(response.data.accessToken)
      console.log(decoded)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  return (
    <div>Home</div>
  )
}

export default Home