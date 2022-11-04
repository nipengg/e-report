import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CDBSpinner } from 'cdbreact'
import Container from 'react-bootstrap/esm/Container'
import jwt_decode from 'jwt-decode'
import Layout from '../../Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Footer from '../../Layout/Footer'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Nav from 'react-bootstrap/Nav';
import TableEnrolls from './components/TableEnrolls'
import TableScores from './components/TableScores'

const ShowStudent = () => {

    let { name } = useParams();

    const url = 'http://localhost:3000/'

    const navigate = useNavigate()

    // Auth State
    const [user, setUser] = useState([])
    const [token, setToken] = useState('')
    const [check, setCheck] = useState(false)

    const [data, setData] = useState([])

    const [key, setKey] = useState('enroll')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        refreshToken();
        if (check == true) getData()
    }, [check])

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
        const response = await axios.get(`${url}student/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setData(response.data.data)
        setLoading(false)
    }

    return (
        <>
            <Layout name={user.name} />
            <Container style={{ height: "108vh" }}>
                {loading === true ? <div style={{ textAlign: 'center', paddingTop: 250 }}><CDBSpinner dark /></div> :
                    <>
                        {data.length !== 0 ?
                            data.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Row>
                                            <Col sm={3}>
                                                <Card style={{ width: '18rem' }}>
                                                    <Card.Img variant="top" src="https://riverlegacy.org/wp-content/uploads/2021/07/blank-profile-photo.jpeg" />
                                                    <Card.Body>
                                                        <Card.Title style={{ textAlign: 'center' }}>{item.student_name}</Card.Title>
                                                        <hr />
                                                        <Card.Text>
                                                            <ListGroup variant="flush">
                                                                <ListGroup.Item>NIM: {item.student_nim}</ListGroup.Item>
                                                                <ListGroup.Item>Major: {item.major}</ListGroup.Item>
                                                                <ListGroup.Item>Age: {item.student_age}</ListGroup.Item>
                                                                <ListGroup.Item>Gender: {item.student_gender}</ListGroup.Item>
                                                                <ListGroup.Item>City: {item.city}</ListGroup.Item>
                                                                <ListGroup.Item>Birth: {item.student_place_of_birth}, {item.student_date_of_birth}</ListGroup.Item>
                                                            </ListGroup>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col sm={9}>
                                                <Nav fill variant="tabs" defaultActiveKey={key}>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="enroll" onClick={() => setKey('enroll')}>Enroll Course</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="scores" onClick={() => setKey('scores')}>Scores</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="ipk" onClick={() => setKey('ipk')}>IPK</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="attendance" onClick={() => setKey('attendance')}>Attendance</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                                {(() => {
                                                    if (key == 'enroll') {
                                                        return (
                                                            <TableEnrolls id={item.student_nim} token={token} />
                                                        )
                                                    } else if (key == 'scores') {
                                                        return (
                                                            <TableScores id={item.student_nim} token={token} />
                                                        )
                                                    } else if (key == 'ipk') {
                                                        return (
                                                            <div>ipk</div>
                                                        )
                                                    } else if (key == 'attendance') {
                                                        return (
                                                            <div>attendance</div>
                                                        )
                                                    }
                                                })()}
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            })
                            : <h1 style={{ textAlign: 'center', paddingTop: 250 }}>Student "{name}" does not Exist</h1>}
                    </>
                }
            </Container>
            <Footer />
        </>
    )
}

export default ShowStudent