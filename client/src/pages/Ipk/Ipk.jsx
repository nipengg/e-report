import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';

const Ipk = () => {

  const url = 'http://127.0.0.1:3000/'

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios.get(`${url}ipk`)
      .then((response) => {
        const data = response.data.data
        setData(data);
        setLoading(false);
      }).catch(error => console.error(`Error: ${error}`))
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
                <th>Total Score</th>
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
                    <td>{item.total_score}</td>
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

export default Ipk