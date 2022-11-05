import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import axios from 'axios'

const ModalScore = ({ id, setCheck, token }) => {

    const url = 'http://localhost:3000/'

    const [show, setShow] = useState(false)

    // Data State
    const [score, setScore] = useState('')

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const createData = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${url}score/update?id=${id}`, {
                value: score
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

    return (
        <>
            <Button style={{ width: "100%" }} onClick={handleShow} variant="success">Add Score</Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Score</Modal.Title>
                </Modal.Header>
                <Form onSubmit={createData}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Score</Form.Label>
                            <Form.Control value={score} type="number" placeholder="Enter score" onChange={(e) => setScore(e.target.value)} />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary">
                            Add Score
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </>
    )
}

export default ModalScore