import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addVoter, getVoters } from '../apiCalls/apiCalls'


function AddVoterModal({ modalHandler, updateVoters, change,electionid }) {

    const [show, setShow] = useState(modalHandler);
    const handleClose = () => change()

    useEffect(() => {
        setShow(modalHandler);
    }, [modalHandler]);

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const voterid = e.target.voterid.value;
        const email = e.target.email.value;
        const number = e.target.number.value;
        // const electionid =  1234;
        console.log(electionid)
        const res = await addVoter(voterid, email, number, electionid);
        alert(res.data)
        updateVoters(await getVoters(electionid))

    }

    return (
        <>
            {/* NB capture election direct from onclick of election */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add voter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="voterid">
                            <Form.Label>Voter id</Form.Label>
                            <Form.Control type="text" placeholder="voters id" name="voterid" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" />
                            <Form.Text className="text-muted">
                                password will be sent to this email
                            </Form.Text>
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

export default AddVoterModal

// voterId,
//     mobile,
//     email,
//     passcode,
//     host,
//     addedAt