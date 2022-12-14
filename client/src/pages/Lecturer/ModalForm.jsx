import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalForm = ({ token, setCheck, setMsg, setType }) => {

    const url = 'http://localhost:3000/'

    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')

    const createData = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${url}lecturer`, {
                lecturerName: name,
                lecturerAge: parseInt(age),
                lecturerAddress: address,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setShow(false)
            setName('')     
            setAge('')
            setAddress('')
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
                        Submit
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalForm