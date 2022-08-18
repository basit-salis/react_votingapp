import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addCandidate, getCandidate } from '../apiCalls/apiCalls'


function AddCandidateModal({ modalHandler, updateCandidates, change,electionid }) {
  const [show, setShow] = useState(modalHandler);
  const handleClose = () => { change(); setShow(false) }

  const handleSubmit = async(e)=>{
    e.preventDefault()

    const candidate_name = e.target.candidate_name.value
    const position = e.target.position.value
    const title = e.target.title.value
    const email = e.target.email.value
    const number = e.target.number.value
    console.log(candidate_name, position, title, email, number)
    const data = await addCandidate(candidate_name, position, title, email, number,electionid)
    updateCandidates(await getCandidate(electionid))
    alert(data)
  }

  useEffect(() => {
    setShow(modalHandler);
  }, [modalHandler]);

  return (
    <>
      {/* candidate,
        title,
        Electionid */}
        {/* NB capture election direct from onclick of election */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="CanName">
              <Form.Label>Candidate Name</Form.Label>
              <Form.Control type="text" placeholder="Candidate Name" name="candidate_name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="position">
              <Form.Label>Position</Form.Label>
              <Form.Control type="text" placeholder="Position" name="position" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label> Title</Form.Label>
              <Form.Select aria-label="Default select example" name="title" >
                <option value="1">Mr</option>
                <option value="2">Mrs</option>
                <option value="3">Ms</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="MobileNumber">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" placeholder="23345949665" name="number" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddCandidateModal;
