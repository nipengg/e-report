import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import axios from 'axios'

const ModalEnroll = ({ id, token, setCheck, semester }) => {

    const url = 'http://localhost:3000/'

    const [show, setShow] = useState(false)

    // Data State
    const [course, setCourse] = useState('')
    const [lecturer, setLecturer] = useState('')
    const [classR, setClassR] = useState('')

    // Option State
    const [dataCourse, setDataCourse] = useState([])
    const [dataLecturer, setDataLecturer] = useState([])
    const [dataClass, setDataClass] = useState([])

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        if (show) {
            getData()
        }
    }, [show])

    const getData = async () => {
        const response = await axios.get(`${url}enroll/c/student?id=${id}&semester=${semester}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setDataCourse(response.data.course)
        setDataLecturer(response.data.lecturer)
        setDataClass(response.data.class)
    }

    const createData = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${url}enroll`, {
                nim: id,
                class_id: classR,
                lecturer_id: lecturer,
                course_id: course,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setShow(false)
            setCheck(true)
        } catch (error) {
            console.log(error)
            setShow(false)
            setCheck(true)
        }
    }

    const courseOptions = dataCourse.map(function (course) {
        return { value: course.course_id, label: `${course.course_name} - Semester ${course.semester}` }
    })

    const lecturerOptions = dataLecturer.map(function (lecturer) {
        return { value: lecturer.lecturer_id, label: lecturer.lecturer_name }
    })

    const classOptions = dataClass.map(function (item) {
        return { value: item.class_id, label: item.class_name }
    })

    return (
        <>
            <Button onClick={handleShow} variant="success">Add Enrolls</Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Enrolls</Modal.Title>
                </Modal.Header>
                <Form onSubmit={createData}>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Course</Form.Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                name="course"
                                onChange={(e) => setCourse(e.value)}
                                options={courseOptions}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Lecturer</Form.Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                name="lecturer"
                                onChange={(e) => setLecturer(e.value)}
                                options={lecturerOptions}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Class</Form.Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                name="class"
                                onChange={(e) => setClassR(e.value)}
                                options={classOptions}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalEnroll