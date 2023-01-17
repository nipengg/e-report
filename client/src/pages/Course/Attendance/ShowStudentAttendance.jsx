import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'
import jwt_decode from 'jwt-decode'
import Layout from '../../Layout/Layout'
import Footer from '../../Layout/Footer'
import { useNavigate } from 'react-router-dom'
import { CDBSpinner } from 'cdbreact'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams } from 'react-router-dom'

const ShowStudentAttendance = () => {

    let { courseID, classID } = useParams();

    const url = 'http://localhost:3000/'

    const navigate = useNavigate()

    // Auth State
    const [user, setUser] = useState([])
    const [token, setToken] = useState('')
    const [check, setCheck] = useState(false)

    // Data State
    const [data, setData] = useState([])
    const [keyword, setKeyword] = useState('')
    const [className, setClassName] = useState('')
    const [courseName, setCourseName] = useState('')

    const [msg, setMsg] = useState('')
    const [type, setType] = useState('')
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')

    useEffect(() => {
        refreshToken();
        if (check == true) getData()
    }, [keyword, check])

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
        const response = await axios.get(`${url}course/attend/${courseID}/${classID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        setData(response.data.data)
        setClassName(response.data.className)
        setCourseName(response.data.courseName)
        setLoading(false)
    }

    const incrementAttendance = async ( studentNIM ) => {
        await axios.put(`${url}course/attend/student`, {
           courseID: courseID,
           classID: classID,
           studentNIM: studentNIM
        }

        )
    }

    return (
        <>
            <Layout name={user.name} />
            <Container style={{ height: "108vh" }}>
                {loading === true ? <div style={{ textAlign: 'center', paddingTop: 250 }}><CDBSpinner dark /></div> :
                    <>
                        <Row>
                            <Col sm={11}><h1>{courseName[0].course_name} - {className[0].class_name} - Student</h1></Col>
                        </Row>
                        <hr />
                        {msg ?
                            <Alert variant={type} onClose={() => setMsg('')} dismissible>
                                {msg}
                            </Alert>
                            : ''}

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>NIM</th>
                                    <th>Name</th>
                                    <th>Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item[0].student_nim}</td>
                                            <td>{item[0].student_name}</td>
                                            <td><Button variant="success" onClick={incrementAttendance(item[0].student_nim)} > + </Button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </>
                }
            </Container>
            <Footer />
        </>
    )
}

export default ShowStudentAttendance