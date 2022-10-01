import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';

const Score = () => {
  return (
    <>
      <Container>
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

          <tbody>
            <tr>
              <td>1</td>
              <td>2540131071</td>
              <td>Arvel Kartawijaya</td>
              <td>3</td>
              <td>Data Structure</td>
              <td>90</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default Score