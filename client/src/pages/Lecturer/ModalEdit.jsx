import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalEdit = ({ token, setCheck, setMsg, setType, lecId, lecName, lecAge, lecAddress }) => {

    const url = 'http://localhost:3000/'

    const [show, setShow] = useState(false)
    const [name, setName] = useState(lecName)
    const [age, setAge] = useState(lecAge)
    const [address, setAddress] = useState(lecAddress)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit {name}</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Lecturer Name </Form.Label>
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
                            <Form.Label> Address </Form.Label>
                            <Form.Control
                                as="textarea" rows={3}
                                placeholder="Enter Address.."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
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