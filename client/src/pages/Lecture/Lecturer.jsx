import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import jwt_decode from 'jwt-decode'
import Layout from '../Layout/Layout'
import Container from 'react-bootstrap/esm/Container'
import { useNavigate } from 'react-router-dom'

const Lecturer = () => {

  const url = 'http://localhost:3000/'

  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState([])
  const [token, setToken] = useState('')
  const [check, setCheck] = useState(false)

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
      console.log(error)
    }
  }

  const getData = () => {
    axios.get(`${url}lecturer`)
      .then((response) => {
        const data = response.data.data
        setData(data);
        setLoading(false);
      }).catch(error => console.error(`Error: ${error}`))
  }

  return (
    <>
      <Layout name={user.name} />
      <Container>
        {loading === true ? <h1>Loading...</h1> :
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Lecturer_id</th>
                <th>Lecturer_name</th>
                <th>Age</th>
                <th>Address</th>
              </tr>
            </thead>
            {data.map((lecturer, index) => {
              return (

                <tbody key={index}>
                  <tr>
                    <td>{lecturer.lecturer_id}</td>
                    <td>{lecturer.lecturer_name}</td>
                    <td>{lecturer.age}</td>
                    <td>{lecturer.address}</td>
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

export default Lecturer