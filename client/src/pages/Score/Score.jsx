import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/esm/Container'
import jwt_decode from 'jwt-decode'
import Layout from '../Layout/Layout'
import { useNavigate } from 'react-router-dom'

const Score = () => {

  const url = 'http://localhost:3000/'

  const navigate = useNavigate()

  // Auth State
  const [user, setUser] = useState([])
  const [token, setToken] = useState('')
  const [check, setCheck] = useState(false)

  // Data State
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    refreshToken();
    if (check == true) getData()
  }, [check])

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${url}users/token`)

      if (response) {
        setToken(response.data.accessToken)
        const decoded = jwt_decode(response.data.accessToken)
        setUser(decoded)
        setCheck(true)
      }
    } catch (error) {
      navigate('/login')
      console.log(error.response.data.message)
    }
  }

  const getData = async () => {
    const response = await axios.get(`${url}score`)
    setData(response.data.data)
    setLoading(false)
  }

  return (
    <>
      <Layout name={user.name} />
      <Container>
        {loading === true ? <h1>Loading...</h1> :
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>NIM</th>
                <th>Name</th>
                <th>Semester</th>
                <th>Course</th>
                <th>Score</th>
              </tr>
            </thead>
            {data.map((item, index) => {
              return (

                <tbody key={index}>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.nim}</td>
                    <td>{item.student.name}</td>
                    <td>{item.semester}</td>
                    <td>{item.course.course_name}</td>
                    <td>{item.score}</td>
                  </tr>
                </tbody>
              )

            })}

          </Table>
        }
      </Container>
    </>
  )
}

export default Score