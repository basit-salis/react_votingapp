import React from 'react'
import { useEffect,useState } from "react";
import { Modal, Button,Form } from 'react-bootstrap';
import {editVoter, getVoters} from '../apiCalls/apiCalls';


function EditVoterModal({modalHandler,updateVoters,change,electionid}) {
const handler = modalHandler.status;
console.log(handler)
 const [show, setShow] = useState(handler);

  const handleClose = () =>  change();
  
    useEffect(() => {
        setShow(handler);
    }, [handler]);

    const handleSubmit = async (e)=>{
        e.preventDefault()
        let voterid = e.target.voterid.value
        let email = e.target.email.value
        let number = e.target.number.value
        let id = modalHandler.id
        console.log(voterid,email,number,id)
        let res = await editVoter(voterid,email,number,id)
        alert(res)
        updateVoters(await getVoters(electionid))
    }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit voter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <Form onSubmit = {handleSubmit}>
                      <Form.Group className="mb-3" controlId="VoterId">
                          <Form.Label>voter id</Form.Label>
                          <Form.Control type="text" placeholder="voter identification" name="voterid" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="Email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="voter@xyz" name="email"/>
                      </Form.Group>
                         <Form.Group className="mb-3" controlId="Number">
                          <Form.Label>Phone number</Form.Label>
                          <Form.Control type="text" placeholder="123456789" name="number"/>
                      </Form.Group>   
                      <Button variant="primary" type="submit">
                          Submit
                      </Button>
                  </Form>
        </Modal.Body>

      </Modal>
    </>
  )}



  export default EditVoterModal;