import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
            {loading === true ? 'loading...' :
                <table border='1'>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>name</td>
                            <td>scu</td>
                            <td>lecturer</td>
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
                </table>
            }
        </div>
    )
}

export default Course