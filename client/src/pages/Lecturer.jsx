import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Lecturer = () => {
    const url = 'http://127.0.0.1:3000/'

    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(`${url}lecturer`)
            .then((response) => {
                const data = response.data.data
                setLecturers(data);
                setLoading(false);
            }).catch(error => console.error(`Error: ${error}`))
    }

    return (
        <div>
            {loading === true ? 'loading...' :
                <table border='1'>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>name</td>
                            <td>age</td>
                            <td>address</td>
                        </tr>
                    </thead>
                    {lecturers.map((lecturer, index) => {
                        return (

                            <tbody key={index}>
                                <tr>
                                    <td>{lecturer.lecturer_id}</td>
                                    <td>{lecturer.lecturer_name}</td>
                                    <td>{lecturer.age}</td>
                                    <td>{lecturer.address}</td>
                                </tr>
                            </tbody>

                        )
                    })}
                </table>
            }
        </div>
    )
}

export default Lecturer