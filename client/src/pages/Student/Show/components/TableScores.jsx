import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { CDBSpinner } from 'cdbreact'
import ModalScore from '../Modal/ModalScore'
import Button from 'react-bootstrap/Button'

const TableScores = ({ id, token }) => {
    const url = 'http://localhost:3000/'

    const [data, setData] = useState([])
    const [gen, setGen] = useState()
    const [loading, setLoading] = useState(true)
    const [check, setCheck] = useState(false)

    useEffect(() => {
        getData()
    }, [check])


    const getData = async () => {
        try {
            const response = await axios.get(`${url}score/s/student?nim=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setData(response.data.data)
            setGen(response.data.check)
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
                                            {item.score == null ? <ModalScore id={item.score_id} setCheck={setCheck} token={token} text={"Add Score"} />
                                                : <ModalScore id={item.score_id} setCheck={setCheck} token={token} text={"Edit Score"} />}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    { gen === true ? <Button variant="success">Generate Score Report</Button> : null }
                </>
            }
        </>
    )
}

export default TableScores