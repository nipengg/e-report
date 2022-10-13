import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'
import jwt_decode from 'jwt-decode'
import Layout from '../Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { CDBSpinner } from 'cdbreact'
import Footer from '../Layout/Footer'

const Score = () => {

  const url = 'http://localhost:3000/'

  const navigate = useNavigate()

  // Auth State
  const [user, setUser] = useState([])
  const [token, setToken] = useState('')
  const [check, setCheck] = useState(false)

  // Data State
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [pages, setPages] = useState(0)
  const [rows, setRows] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [query, setQuery] = useState('')

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
    const response = await axios.get(`${url}score?search=${keyword}&page=${page}&limit=${limit}`)
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
            <h1>Score</h1>
            <hr />
            <Form onSubmit={searchData}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" placeholder="Search by NIM..." value={query} onChange={(e) => setQuery(e.target.value)} />
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
                  <th>Score ID</th>
                  <th>Score Semester</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Lecturer</th>
                  <th>Class</th>
                  <th>Score</th>
                </tr>
              </thead>
              {data.map((item, index) => {
                return (

                  <tbody key={index}>
                    <tr>
                      <td>{item.score_id}</td>
                      <td>Semester-{item.score_semester}</td>
                      <td>{item.enroll.nim} - {item.enroll.student.student_name}</td>
                      <td>{item.enroll.course.course_name}</td>
                      <td>{item.enroll.lecturer.lecturer_name}</td>
                      <td>{item.enroll.class.class_name}</td>
                      <td>{item.score}</td>
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

export default Score