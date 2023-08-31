"use client";
import React, { useState } from "react"
// import { getContract } from '../tezos';
import dynamic from 'next/dynamic';
const { getContract } = dynamic(() => import('../tezos').then((mod) => mod.getContract), { ssr: false });

import '../static/css/register.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register(){

    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    async function handleClick() {
        const contract = await getContract();
        console.log(contract);
        const op = await contract.methods.default(bio, name).send();
        console.log(op);
        await op.confirmation();
        console.log("Registered!")
        alert("Registered!")
    }

    return(
        <>
            <Modal
                show={modalIsOpen}
                onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter username" 
                            id="name"
                            onChange={e => setName(e.target.value)}
                            value={name}
                            className="modal-input"/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter bio" 
                            id="bio"
                            onChange={e => setBio(e.target.value)}
                            value={bio}
                            className="modal-input"/>
                    </Form.Group>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={handleClick} className="modal-submit-btn">Submit</Button>
                </Modal.Footer>
            </Modal>
            <button onClick={openModal} className="btn btn-register">REGISTER</button>
        </>
    );
}

export default Register;