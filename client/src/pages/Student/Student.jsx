import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';

const Student = () => {
    const url = 'http://127.0.0.1:3000/'

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(`${url}student`)
            .then((response) => {
                const data = response.data.data
                setData(data);
                setLoading(false);
            }).catch(error => console.error(`Error: ${error}`))
    }

    return (
        <div>
            <Container>
                {loading === true ? 'loading...' :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>NIM</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Address</th>
                                <th>Place of Birth</th>
                                <th>Date of Birth</th>
                                <th>City</th>
                                <th>Class</th>
                            </tr>
                        </thead>
                        {data.map((item, index) => {
                            return (

                                <tbody key={index}>
                                    <tr>
                                        <td>{item.nim}</td>
                                        <td>{item.name}</td>
                                        <td>{item.age}</td>
                                        <td>{item.address}</td>
                                        <td>{item.place_of_birth}</td>
                                        <td>{item.date_of_birth}</td>
                                        <td>{item.city.name}</td>
                                        <td>{item.class.class_name}</td>
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

export default Student