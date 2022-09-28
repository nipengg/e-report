import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Lecturer = () => {
    const url = 'http://127.0.0.1:3000/'

    const [lecturers, setLecturers] = useState([]);

    useEffect(() => {

        getData();

    }, [])

    const getData = () => {
        axios.get(`${url}lecturer`)
        .then((response) => {
            const data = response.data.data
            setLecturers(data);
            console.log(lecturers)
        }).catch(error => console.error(`Error: ${error}`))
    }

  return (
    <div>
        { lecturers.map((lecturer, index) => {
            return(
                <h1 key={index}>{lecturer.lecturer_name}</h1>
            )
        }) }
    </div>
  )
}

export default Lecturer