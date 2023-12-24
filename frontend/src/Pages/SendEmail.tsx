import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import { FaUser } from "react-icons/fa";
import { Card, Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import axios from 'axios';
import configData from '../config/Config';
import useCustomScroll from '../hooks/Scroll';

const sendMailUrl: string = configData.API_URL + "/reset-password";

const SendEmail = () => {
    useCustomScroll();
    const { isLoggedIn } = useAppSelector(state => state.user) || [];
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [reciever, setReciever] = useState('');
    const [errors, setErrors] = useState({
        email: "",
    });


    if (isLoggedIn) return <Navigate to="/" />;

    interface userInfo {
        email: String,
    }

    const validateErrors = {
        email: "",
    };

    const headers = {
        'Content-Type': 'application/json'
    }

    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const handleSendEmail = (e: any) => {
        e.preventDefault();

        if (!email.trim() || (!expression.test(email))) validateErrors.email = "Please enter a valid email.";

        if (validateErrors.email) {
            setErrors(validateErrors);
            setMessage('');
            setReciever('');
        }

        const isError = Object.values(validateErrors).filter((val) => { return val != '' });

        if (isError.length === 0) {
            const userCredentials: userInfo = {
                email
            }
            sendMail(userCredentials);
        }
    }

    const sendMail = async (userCredentials: userInfo) => {
        setLoading(true);
        await axios.post(sendMailUrl, userCredentials, {
            headers: headers,
        })
            .then(res => {
                // console.log(res);
                setMessage(res.data.message);
                showMessages();
                setReciever(email);
                setEmail('');
            })
            .catch(error => {
                // console.log(error);
                setError(error.response.data.message);
                showMessages();
            });

    }

    const showMessages = () => {
        setLoading(false);
        setTimeout(() => {
            setError('');
            // setMessage('');
        }, 3000);
    }


    return (
        <Container fluid className='login-container topzxcv-mnbv' >
            <Row className="justify-content-md-center">
                <Col xs={12} md={4} sm={4} className='outer-login p-3 pt-0'>
                    <Card className="w-100">
                        <Card.Body className='credential-Body'>
                            <Card.Title className="text-center mt-3">Send Mail</Card.Title>
                            <Form className='mt-3'>
                                <Col sm="10" className='login-input-box'>
                                    <Card.Text className='mt-2 signup-link mb-5 text-center'>
                                        Please enter your registered email id to get the password reset link.
                                    </Card.Text>
                                    <InputGroup>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoFocus
                                        />
                                        <InputGroup.Text id="basic-addon1"><FaUser></FaUser></InputGroup.Text>
                                    </InputGroup>
                                    <div style={{ color: 'red', textAlign: 'left', height: '1.8rem' }}>{errors.email}</div>
                                </Col>
                            </Form>
                            <Col sm={12} md={12} xs={12} className='submit-box text-center pt-1'>
                                <Button type='submit' onClick={handleSendEmail} className='whiteBtn'>{loading ? 'Loading...' : 'Send Mail'}</Button>
                            </Col>
                            <Col className='text-center'>
                                <div className='error-msg' style={{ color: 'red', textAlign: 'center', height: '1.2rem' }}>{error && error}</div>
                                <div className='error-msg' style={{ color: '#ca29f2', textAlign: 'center', height: '1.2rem' }}>{reciever && reciever}</div>
                                <div className='error-msg' style={{ color: 'green', textAlign: 'center', height: '1.2rem' }}>{message && message}</div>
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default SendEmail