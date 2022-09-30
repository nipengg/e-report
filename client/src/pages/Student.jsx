import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
            {loading === true ? 'loading...' :
                <table border='1'>
                    <thead>
                        <tr>
                            <td>NIM</td>
                            <td>Name</td>
                            <td>Age</td>
                            <td>Address</td>
                            <td>Place of Birth</td>
                            <td>Date of Birth</td>
                            <td>City</td>
                            <td>Class</td>
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
                </table>
            }
        </div>
    )
}

export default Student