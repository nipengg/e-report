import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'
import jwt_decode from 'jwt-decode'
import Layout from '../Layout/Layout'
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom'
import { CDBSpinner } from 'cdbreact'
import Footer from '../Layout/Footer'
import ModalForm from './ModalForm'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Student = () => {

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
    
    const [msg, setMsg] = useState('')
    const [type, setType] = useState('')
    const [loading, setLoading] = useState(true);

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
        const response = await axios.get(`${url}student?search=${keyword}&page=${page}&limit=${limit}`, {
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
                            <Col sm={11}><h1>Student</h1></Col>
                            <Col sm={1}>
                                <ModalForm token={token} setCheck={setCheck} setMsg={setMsg} setType={setType} />
                            </Col>
                        </Row>
                        <hr />
                        <Form onSubmit={searchData}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Search</Form.Label>
                                <Form.Control type="text" placeholder="Search by name..." value={query} onChange={(e) => setQuery(e.target.value)} />
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
                                    <th>NIM</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Address</th>
                                    <th>Place of Birth</th>
                                    <th>Date of Birth</th>
                                    <th>City</th>
                                </tr>
                            </thead>
                            {data.map((item, index) => {
                                return (

                                    <tbody key={index}>
                                        <tr>
                                            <td>{item.student_nim}</td>
                                            <td>{item.student_name}</td>
                                            <td>{item.student_age}</td>
                                            <td>{item.student_gender}</td>
                                            <td>{item.student_address}</td>
                                            <td>{item.student_place_of_birth}</td>
                                            <td>{item.student_date_of_birth}</td>
                                            <td>{item.city}</td>
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

export default Student