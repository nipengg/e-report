import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';

const City = () => {
    const url = 'http://127.0.0.1:3000/'

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(`${url}city`)
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
                }
            </Container>
        </div>
    )
}

export default City