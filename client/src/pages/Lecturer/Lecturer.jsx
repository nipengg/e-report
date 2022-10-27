import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import jwt_decode from 'jwt-decode'
import Layout from '../Layout/Layout'
import Container from 'react-bootstrap/esm/Container'
import { useNavigate } from 'react-router-dom'
import { CDBSpinner } from 'cdbreact'
import Footer from '../Layout/Footer'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ModalForm from './ModalForm'

const Lecturer = () => {

  const url = 'http://localhost:3000/'

  const navigate = useNavigate()

  // Auth State
  const [user, setUser] = useState([])
  const [token, setToken] = useState('')
  const [check, setCheck] = useState(false)

  // Data state
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [pages, setPages] = useState(0)
  const [rows, setRows] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [query, setQuery] = useState('')

  const [msg, setMsg] = useState('')
  const [type, setType] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    refreshToken();
    if (check == true) getData()
  }, [page, keyword, check])

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
    const response = await axios.get(`${url}lecturer?search=${keyword}&page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    setData(response.data.data)
    setPage(response.data.page)
    setLimit(response.data.limit)
    setRows(response.data.totalRows)
    setPages(response.data.totalPage)
    setLoading(false)
  }

  const changePage = ({ selected }) => {
    setPage(selected)
  }

  const searchData = (e) => {
    e.preventDefault()
    setPage(0)
    setKeyword(query)
  }

  const clearSearchbar = () => {
    setKeyword('')
    setQuery('')
  }

  return (
    <>
      <Layout name={user.name} />
      <Container style={{ height: "108vh" }}>
        {loading === true ? <div style={{ textAlign: 'center', paddingTop: 250 }}><CDBSpinner dark /></div> :
          <>
            <Row>
              <Col sm={11}><h1>Lecturer</h1></Col>
              <Col sm={1}>
                <ModalForm token={token} setCheck={setCheck} setMsg={setMsg} setType={setType} />
              </Col>
            </Row>
            <hr />
            {msg ?
              <Alert variant={type} onClose={() => setMsg('')} dismissible>
                {msg}
              </Alert>
              : ''}
            <Form onSubmit={searchData}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" placeholder="Search by lecturer name..." value={query} onChange={(e) => setQuery(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit" style={{ marginRight: 10 }}>
                Search
              </Button>
              <Button variant="danger" onClick={clearSearchbar}>
                Clear
              </Button>
            </Form>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Lecturer ID</th>
                  <th>Lecturer name</th>
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
                      <td>{lecturer.lecturer_age}</td>
                      <td>{lecturer.lecturer_address}</td>
                    </tr>
                  </tbody>
                )
              })}
            </Table>
            <p>Total Rows: {rows} &nbsp; &nbsp; Page: {rows ? page + 1 : 0} of {pages}</p>
            <nav key={rows}>
              <ReactPaginate
                previousLabel={"< Prev"}
                nextLabel={"Next >"}
                pageCount={pages}
                onPageChange={changePage}
                containerClassName={"pagination pagination-md justify-content-center"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                activeLinkClassName={"page-link active"}
                disabledLinkClassName={"page-link disabled"}
              />
            </nav>
          </>
        }
      </Container>
      <Footer />
    </>
  )
}

export default Lecturer