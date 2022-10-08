import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'
import jwt_decode from 'jwt-decode'
import Layout from '../Layout/Layout'
import { useNavigate } from 'react-router-dom'
import ModalForm from './ModalForm'

const City = () => {

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
        const response = await axios.get(`${url}city?search=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
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

    return (
        <>
            <Layout name={user.name} />
            <Container>
                <Row>
                    <Col sm={11}><h1>City</h1></Col>
                    <Col sm={1}>
                        <ModalForm />
                    </Col>
                </Row>
                <hr />
                {loading === true ? <h1>Loading...</h1> :
                    <>
                        <Form onSubmit={searchData}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Search</Form.Label>
                                <Form.Control type="text" placeholder="Find anything here..." value={query} onChange={(e) => setQuery(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{ marginRight: 10 }}>
                                Search
                            </Button>
                            <Button variant="danger">
                                Clear
                            </Button>
                        </Form>
                        <br />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            {data.map((city, index) => {
                                return (

                                    <tbody key={index}>
                                        <tr>
                                            <td>{city.id}</td>
                                            <td>{city.name}</td>
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
        </>
    )
}

export default City