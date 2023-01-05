import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalEdit = ({ token, setCheck, setMsg, setType, sNim, sName, sMajor, sAge, sGender, sAddress, sPob, sDob, sCity }) => {

    const url = 'http://localhost:3000/'

    const [show, setShow] = useState(false)
    const [name, setName] = useState(sName)
    const [age, setAge] = useState(sAge)
    const [gender, setGender] = useState(sGender)
    const [address, setAddress] = useState(sAddress)
    const [pob, setPob] = useState(sPob)
    const [dob, setDob] = useState(sDob)
    const [city, setCity] = useState(sCity)
    const [major, setMajor] = useState(sMajor)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update {name}</Modal.Title>
                </Modal.Header>
                <Form>
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
                            <Form.Label> Age </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Age.."
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Gender </Form.Label>
                            <Form.Check
                                type="radio"
                                label="Male"
                                name="gender"
                                value={"Male"}
                                checked={gender == "Male" ? true : false}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <Form.Check
                                type="radio"
                                label="Female"
                                name="gender"
                                value={"Female"}
                                checked={gender == "Female" ? true : false}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Address </Form.Label>
                            <Form.Control
                                as="textarea" rows={3}
                                placeholder="Enter Address.."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Place of Birth </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Place of Birth.."
                                value={pob}
                                onChange={(e) => setPob(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Date of Birth </Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Enter Date of Birth.."
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Major </Form.Label>
                            <Form.Select aria-label="Default select example" onClick={(e) => setMajor(e.target.value)}>
                                <option value="CS" selected={major == "CS" ? true : false}>Computer Science</option>
                                <option value="BC" selected={major == "BC" ? true : false}>Business Creation</option>
                                <option value="DKV" selected={major == "DKV" ? true : false}>DKV</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> City </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter City of Residence.."
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Form.Group>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalEdit