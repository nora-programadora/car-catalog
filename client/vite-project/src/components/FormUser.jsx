import React, { useState } from 'react'
import {Button, Col, Container, Row, Form} from 'react-bootstrap';
import axios from 'axios'

const FormUser = () => {

    const [userData, setUserData] = useState()

    const saveUser = async () => {
        const url = 'http://localhost:4000/users'
        const result = await axios.post(url, userData)
        console.log(result)
    }

    const  handleChange = (e) => {
        const { name, value } = e.target
        
        setUserData({
            ...userData,
            [name]: value
        })
        console.log(userData)
    }

    return (
        // <div>FormUser</div>
        <Container>
            <Row>
                <Col md={12}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleChange} name="email" type="text" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={handleChange} name="username" type="text" placeholder="Enter the username you wish" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={handleChange} name="name" type="text" placeholder="Enter your firsname" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Can show all</Form.Label>
                        <Form.Control onChange={handleChange} name="canshowall" type="text" placeholder="Enter true or false" />
                    </Form.Group>
            
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={() => saveUser()}>
                    Submit
                    </Button>
                </Form>
                </Col>
            </Row>
        </Container>
        
    )
}

export default FormUser