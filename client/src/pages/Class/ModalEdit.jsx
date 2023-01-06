import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalEdit = ({ token, setCheck, setMsg, setType, cId, cName, cTotal }) => {

  const url = 'http://localhost:3000/'

  const [show, setShow] = useState(false)
  const [name, setName] = useState(cName)
  const [totalStudent, setTotalStudent] = useState(cTotal)

  const editData = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${url}class`, {
        classID: cId,
        newClassName: name,
        newClassTotal: parseInt(totalStudent),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setShow(false)
      setName('')
      setTotalStudent('')
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
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {cName}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={editData}>
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
              <Form.Label> Total Student </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Total Student.."
                value={totalStudent}
                onChange={(e) => setTotalStudent(e.target.value)}
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