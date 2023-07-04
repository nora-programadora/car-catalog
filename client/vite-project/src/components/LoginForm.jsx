import React, { useState } from 'react'
import {Button, Col, Container, Row, Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const LoginForm = () => {

    const [loginForm, setLoginForm] = useState()
    const url = 'http://localhost:4000/api/v1/auth/login'
    const url2 = 'http://localhost:4000/api/v1/users/me'
    const navigation = useNavigate()

    const login = () => {
        console.log(loginForm)
        // navigation('/catalog')
        axios.post(url, loginForm)
        .then(res => {
            console.log(res.data)
            return (
                axios.get(url2, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${res.data.token}`
                    }
                }).then( response => {
                    console.log(response.data)
                    // return ( <Navigate to="/catalog" replace={true}/>)
                    navigation('/catalog')
                })
            )
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        
        setLoginForm({
            ...loginForm,
            [name]: value
        })
        console.log(loginForm)
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

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={() => login()}>
                    Login
                    </Button>
                </Form>
                </Col>
            </Row>
        </Container>
        
    )
}

export default LoginForm