import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalForm = ({ token, setCheck, setMsg, setType }) => {

    const url = 'http://localhost:3000/'

    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [scu, setScu] = useState('')
    const [totalAttendance, setTotalAttendance] = useState('')
    const [semester, setSemester] = useState('')
    const [major, setMajor] = useState('CS')

    const createData = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${url}course`, {
                courseName: name,
                semesterCreditUnit: parseInt(scu),
                totalAttendance: parseInt(totalAttendance),
                semester: parseInt(semester),
                major: major,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setShow(false)
            setName('')
            setCheck(false)
            setMsg('Success!')
            setType('success')
        } catch (error) {
            setShow(false)
            setType('danger')
            setMsg(error.response.data.message)
        }
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Create
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Data</Modal.Title>
                </Modal.Header>
                <Form onSubmit={createData}>
                <Modal.Body>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Name </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name.."
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> SCU </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Semester Credit Unit.."
                                value={scu}
                                onChange={(e) => setScu(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Total Attendance </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Total Attendance.."
                                value={totalAttendance}
                                onChange={(e) => setTotalAttendance(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Semester </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Course Semester.."
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Major </Form.Label>
                            <Form.Select aria-label="Default select example" onClick={(e) => setMajor(e.target.value)}>
                                <option value="CS">Computer Science</option>
                                <option value="BC">Business Creation</option>
                                <option value="DKV">DKV</option>
                            </Form.Select>
                        </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalForm