import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';

const Score = () => {

  const url = 'http://127.0.0.1:3000/'

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const response = await axios.get(`${url}score`)
    setData(response.data.data)
    setLoading(false)
  }

  return (
    <>
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