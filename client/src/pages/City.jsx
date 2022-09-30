import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Class = () => {
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
            {loading === true ? 'loading...' :
                <table border='1'>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>name</td>
                        </tr>
                    </thead>
                    {data.map((item, index) => {
                        return (

                            <tbody key={index}>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                </tr>
                            </tbody>

                        )
                    })}
                </table>
            }
        </div>
    )
}

export default Class