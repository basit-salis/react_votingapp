import React from 'react'
import { useState,useEffect } from 'react';
import { Modal, Button,Form } from 'react-bootstrap';

function UpdateElectionModal({modalHandler,change}) {

       const [show, setShow] = useState(modalHandler);
    const handleClose = () => change();

    useEffect(() => {
        setShow(modalHandler);
    }, [modalHandler]);

  return (
    <>
     <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Edit ELection</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form>
                      <Form.Group className="mb-3" controlId="electionName">
                          <Form.Label>Election Name</Form.Label>
                          <Form.Control type="text" placeholder="enter election name" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="startTime">
                          <Form.Label>start time</Form.Label>
                          <Form.Control type="date" placeholder="12:00 pm" />
                      </Form.Group>
                         <Form.Group className="mb-3" controlId="stopTime">
                          <Form.Label>Stop time</Form.Label>
                          <Form.Control type="date" placeholder="6:00 pm" />
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

export default UpdateElectionModal