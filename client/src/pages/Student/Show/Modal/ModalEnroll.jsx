import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import axios from 'axios'

const ModalEnroll = ({ id, token }) => {

    const url = 'http://localhost:3000/'

    const [show, setShow] = useState(false)
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
        const response = await axios.get(`${url}enroll/c/student?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setDataCourse(response.data.course)
        setDataLecturer(response.data.lecturer)
        setDataClass(response.data.class)
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
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Course</Form.Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={true}
                                isRtl={false}
                                isSearchable={true}
                                name="color"
                                options={courseOptions}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Lecturer</Form.Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={true}
                                isRtl={false}
                                isSearchable={true}
                                name="color"
                                options={lecturerOptions}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Class</Form.Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={true}
                                isRtl={false}
                                isSearchable={true}
                                name="color"
                                options={classOptions}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEnroll