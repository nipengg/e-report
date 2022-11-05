import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { CDBSpinner } from 'cdbreact'

const TableScores = ({ id, token }) => {
    const url = 'http://localhost:3000/'

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        try {
            const response = await axios.get(`${url}score/s/student?nim=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setData(response.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {loading === true ? <div style={{ textAlign: 'center', paddingTop: 100 }}><CDBSpinner dark /></div> :
                <>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Course</th>
                                <th>Lecturer</th>
                                <th>Scores</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.enroll.course.course_name}</td>
                                        <td>{item.enroll.lecturer.lecturer_name}</td>
                                        <td>{item.score == null ? "-" : item.score}</td>
                                        <td>
                                            {item.score == null ? <Button style={{ width: '100%' }} variant="success">Add Score</Button>
                                                : <Button style={{ width: '100%' }} variant="primary">Edit Score</Button>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </>
            }
        </>
    )
}

export default TableScores