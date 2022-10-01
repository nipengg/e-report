import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';

const Course = () => {
    const url = 'http://127.0.0.1:3000/'

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(`${url}course`)
            .then((response) => {
                const data = response.data.data
                setData(data);
                setLoading(false);
            }).catch(error => console.error(`Error: ${error}`))
    }

    return (
        <div>
            <Container>
                {loading === true ? <h1>Loading...</h1> :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>SCU</th>
                                <th>Lecturer</th>
                            </tr>
                        </thead>
                        {data.map((item, index) => {
                            return (

                                <tbody key={index}>
                                    <tr>
                                        <td>{item.course_id}</td>
                                        <td>{item.course_name}</td>
                                        <td>{item.semester_credit_unit}</td>
                                        <td>{item.lecturer.lecturer_name}</td>
                                    </tr>
                                </tbody>

                            )
                        })}
                    </Table>
                }
            </Container>
        </div>
    )
}

export default Course