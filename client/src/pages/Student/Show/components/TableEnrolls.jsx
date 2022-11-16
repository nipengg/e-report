import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import ModalEnroll from '../Modal/ModalEnroll'
import { CDBSpinner } from 'cdbreact'
import Badge from 'react-bootstrap/Badge'

const TableEnrolls = ({ id, token }) => {

    const url = 'http://localhost:3000/'

    const [data, setData] = useState([])
    const [check, setCheck] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData()
    }, [check])


    const getData = async () => {
        try {
            const response = await axios.get(`${url}enroll/e/student?nim=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setData(response.data.data)
            setCheck(false)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {loading === true ? <div style={{ textAlign: 'center', paddingTop: 100 }}><CDBSpinner dark /></div> :
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Course</th>
                                <th>Class</th>
                                <th>Lecturer</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody >
                            {data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.course.course_name}</td>
                                        <td>{item.class.class_name}</td>
                                        <td>{item.lecturer.lecturer_name}</td>
                                        <td>{item.status === 'active' ? <Badge bg="success">Active</Badge> : <Badge bg="danger">Inactive</Badge>}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <ModalEnroll id={id} token={token} setCheck={setCheck} />
                </>
            }
        </>
    )
}

export default TableEnrolls