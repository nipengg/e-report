import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';

const Lecturer = () => {
  const url = 'http://localhost:3000/'

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [])

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