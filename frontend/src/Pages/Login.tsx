import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { FaUser, FaLock, FaEye, FaFacebook, FaGooglePlus, FaEyeSlash } from "react-icons/fa";
import { Card, Form, FormText, Button, Col, Row, InputGroup } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser, removeMessage } from '../redux/UserSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import useCustomScroll from '../hooks/Scroll';
import { SocialMediaButton } from '../components/SocialMediaButton';


const Login = () => {
    useCustomScroll();
    //Redux state
    const { loading, error, isLoggedIn, user } = useAppSelector(state => state.user) || [];
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    //state
    const [isVisible, setVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        const removeMsg = dispatch(removeMessage());
    }, []);

    if (isLoggedIn) return <Navigate to="/" />;

    interface userInfo {
        email: String,
        password: String
    }

    const validateErrors = {
        email: "",
        password: "",
    };

    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


    const togglePassword = () => {
        setVisible(!isVisible);
    }

    const handleLoginEvent = (e: any) => {
        e.preventDefault();

        if (!email.trim()) validateErrors.email = "Please enter a valid email.";
        else if (!expression.test(email)) validateErrors.email = "Please enter a valid email.";


        if (!password.trim()) validateErrors.password = "Please enter a password.";
        else if (password.length < 8) validateErrors.password = "Password must be at least 8 characters.";
        setErrors(validateErrors);

        const isError = Object.values(validateErrors).filter((val) => { return val != '' });

        if (isError.length === 0) {
            const userCredentials: userInfo = {
                email, password
            }

            dispatch<any>(loginUser(userCredentials))
                .unwrap()
                .then((result: any) => {
                    // console.log(result);
                })
                .catch((rejectedValueOrSerializedError: any) => {
                    // console.log(rejectedValueOrSerializedError);
                    // setTimeout(function () { const removeMsg = dispatch(removeMessage()); }, 3000);
                })
        }
    }


    return (
        <Container fluid className='login-container topzxcv-mnbv' >
            <Row className="justify-content-md-center">
                <span className='error-msg' style={{ color: 'red', textAlign: 'center', height: '1.2rem' }}>{error && error}</span>
                <Col xs={12} md={4} sm={4} className='outer-login p-3 pt-0'>
                    <Card className="w-100">
                        <Card.Body className='credential-Body'>
                            <Card.Title className="text-center ">Login</Card.Title>
                            <Form className='mt-5'>
                                <Col sm="10" className='login-input-box'>
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
                                <Col sm="10" className='login-input-box'>
                                    <InputGroup>
                                        <Form.Control
                                            type={!isVisible ? "password" : "text"}
                                            placeholder="Password"
                                            aria-label="password"
                                            aria-describedby="basic-addon2"
                                            className="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputGroup.Text id="basic-addon2"><FaLock></FaLock></InputGroup.Text>
                                    </InputGroup>
                                    {isVisible ? <FaEye onClick={togglePassword} style={{ color: "#ca29f2" }}></FaEye> : <FaEyeSlash onClick={togglePassword} ></FaEyeSlash>}
                                    <div style={{ color: 'red', textAlign: 'left', height: '1.8rem' }}>{errors.password}</div>
                                </Col>
                                <Col sm="10" className='login-input-box'>
                                    <Link to="/send-email" className='forgot-password'>Forgot Password?</Link>
                                </Col>
                            </Form>
                            <Col sm={12} md={12} xs={12} className='submit-box text-center pt-3 mt-4'>
                                <Button type='submit' onClick={handleLoginEvent} className='whiteBtn'>{loading ? 'Loading...' : 'Login'}</Button>
                                <Col className='mt-2 social-login-link mb-4'>
                                    <SocialMediaButton />
                                </Col>
                                <Card.Text className='mt-2 signup-link mb-4'>
                                    New to Filmfest? <Link to="/sign-up">Sign up for free!</Link>
                                </Card.Text>
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;