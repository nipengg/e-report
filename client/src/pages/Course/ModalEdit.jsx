import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalEdit = ({ token, setCheck, setMsg, setType, courseId, courseName, courseSemester, courseMajor, courseScu, courseTotal }) => {

  const [show, setShow] = useState(false)
  const [name, setName] = useState(courseName)
  const [scu, setScu] = useState(courseScu)
  const [totalAttendance, setTotalAttendance] = useState(courseTotal)
  const [semester, setSemester] = useState(courseSemester)
  const [major, setMajor] = useState(courseMajor)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update
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
                <option value="CS" selected={major == "CS" ? true : false}>Computer Science</option>
                <option value="BC" selected={major == "BC" ? true : false}>Business Creation</option>
                <option value="DKV" selected={major == "DKV" ? true : false}>DKV</option>
              </Form.Select>
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