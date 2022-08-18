import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {updateCandidate, getCandidate} from '../apiCalls/apiCalls'


function EditCandidateModal({ modalHandler,updateCandidates, change, electionid }) {
    const handler = modalHandler.status
  const [show, setShow] = useState(handler);
  const handleClose = () =>  change();

    const handleSubmit = async(e)=>{
    e.preventDefault()

    const candidate_name = e.target.candidate_name.value
    const position = e.target.position.value
    const title = e.target.title.value
    const email = e.target.email.value
    const number = e.target.number.value
    const id = modalHandler.id;
    const data = await updateCandidate(candidate_name, position, title, email, number,electionid,id)
    // nb is a props
    updateCandidates(await getCandidate(electionid))
    alert(data)
  }


  useEffect(() => {
    setShow(handler);
  }, [handler]);

  return (
    <>
      {/* candidate,
        title,
        Electionid */}
        {/* NB capture election direct from onclick of election */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit </Modal.Title>
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

export default EditCandidateModal;
