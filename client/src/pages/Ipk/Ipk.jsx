import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';

const Ipk = () => {
  return (
    <>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>SCU</th>
              <th>Lecturer</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>arvel</td>
              <td>3</td>
              <td>3.0</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default Ipk