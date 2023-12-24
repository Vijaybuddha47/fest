import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { removeMessage } from '../redux/UserSlice';
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import configData from "../config/Config";
import SignupSuccess from "./SignupSuccess";
import { Container, Row, Col, Spinner, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaFacebook, FaGooglePlus, FaEnvelope } from "react-icons/fa";
import useCustomScroll from '../hooks/Scroll';
import { SocialMediaButton } from "../components/SocialMediaButton";

interface SignUpFormState {
    name: string;
    email: string;
    password: string
    confirmPassword: string;
}

const Signup = () => {
    useCustomScroll();
    const dispatch = useAppDispatch();
    const { isLoggedIn } = useAppSelector(state => state.user) || [];
    const [isPasswordVisible, setpasswordVisible] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [requestError, setRequestError] = useState({
        message: '',
        error: false
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [formData, setFormData] = useState<SignUpFormState>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const validateErrors = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const togglePassword = () => {
        setpasswordVisible(!isPasswordVisible);
    }

    const toggleConfirmPassword = () => {
        setConfirmVisible(!isConfirmVisible);
    }

    useEffect(() => {
        function simulateNetworkRequest() {
            return new Promise((resolve) => setTimeout(resolve, 2000));
        }

        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    if (isLoggedIn) return <Navigate to="/" />;

    const { name, email, password, confirmPassword } = formData;

    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) validateErrors.name = "Please enter full name.";
        else if (formData.name.length < 3) validateErrors.name = "Name field should be at least 3 charecter.";


        if (!formData.email.trim()) validateErrors.email = "Please enter a valid email.";
        else if (!expression.test(formData.email)) validateErrors.email = "Please enter a valid email.";

        if (!formData.password.trim()) validateErrors.password = "Password field must be filled.";
        else if (formData.password.length < 8) validateErrors.password = "Password must be at least 8 characters.";

        if (formData.password.trim() != formData.confirmPassword.trim()) validateErrors.confirmPassword = "Password do not match.";

        setErrors(validateErrors);

        const isError = Object.values(validateErrors).filter((val) => { return val != '' });

        if (isError.length === 0) {
            setLoading(true);
            const newUser = {
                name,
                email,
                password,
                confirmPassword,
            };

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                };
                const body = JSON.stringify(newUser);
                const url = configData.API_URL + "/register";

                await axios.post(url, body, config)
                    .then((response) => {
                        console.log(response);
                        if (response.data.user._id) {
                            setLoading(false);
                            setFormData({
                                name: "",
                                email: "",
                                password: "",
                                confirmPassword: ""
                            });
                            dispatch(removeMessage());
                            setIsSuccess(true);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        // console.log(error.response.data.message);
                        setRequestError({ message: error.response.data.message, error: true });
                        setLoading(false);
                        setIsSuccess(false);
                        setTimeout(function () {
                            dispatch(removeMessage());
                            // setRequestError({ message: "", error: false });
                        }, 10000);
                    })

            } catch (e) {
                if (e instanceof Error) {
                    // e is narrowed to Error!
                    console.log(e.message);
                }
            }
        }

    }

    return (

        isSuccess
            ? <SignupSuccess />
            : <Container fluid className='login-container topzxcv-mnbv'>
                < Row className="justify-content-md-center" >
                    {isSuccess && <span style={{ color: 'green', textAlign: 'center' }}>Account has been successfully created.</span>
                    }
                    {requestError.error && <span style={{ color: 'red', textAlign: 'center' }}>{requestError.message}</span>}
                    <Col xs={12} md={4} sm={4} className='outer-login p-3 pt-0'>
                        <Card className="w-100">
                            <Card.Body className='credential-Body'>
                                <Card.Title className="text-center">Sign up for free</Card.Title>
                                <Form className='mt-4'>
                                    <Col sm={10} className='login-input-box mb-3'>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                onChange={onChange}
                                                name='name'
                                                value={name}
                                                required
                                                placeholder="Full Name"
                                                aria-label="Name"
                                                aria-describedby="basic-addon1"
                                                minLength={1}
                                                maxLength={20}
                                                pattern="^[A-Za-z]+$"
                                                autoFocus
                                            />
                                            <InputGroup.Text id="basic-addon1"><FaUser></FaUser></InputGroup.Text>
                                        </InputGroup>
                                        {errors.name && <span style={{ color: "red", fontSize: ".9rem" }}>{errors.name}</span>}
                                    </Col>
                                    <Col sm={10} className='login-input-box mb-3'>
                                        <InputGroup>
                                            <Form.Control
                                                type="email"
                                                onChange={onChange}
                                                name='email'
                                                value={email}
                                                required
                                                placeholder="Email"
                                                aria-label="Email"
                                                aria-describedby="basic-addon2"
                                                minLength={8}
                                                maxLength={100}
                                            />
                                            <InputGroup.Text id="basic-addon2"><FaEnvelope></FaEnvelope></InputGroup.Text>
                                        </InputGroup>
                                        {errors.email && <span style={{ color: "red", fontSize: ".9rem" }}>{errors.email}</span>}
                                    </Col>
                                    <Col sm={10} className='login-input-box mb-3'>
                                        <InputGroup>
                                            {isPasswordVisible ? <FaEye className="pass-eyeslash" style={{ color: '#ca29f2' }} onClick={togglePassword}></FaEye> : <FaEyeSlash className="pass-eyeslash" onClick={togglePassword}></FaEyeSlash>}
                                            <Form.Control
                                                type={isPasswordVisible ? "text" : "password"}
                                                onChange={onChange}
                                                name='password'
                                                value={password}
                                                required
                                                placeholder="Password"
                                                aria-label="Password"
                                                aria-describedby="basic-addon3"
                                                className="password"
                                                minLength={8}
                                                autoComplete="off"
                                            />
                                            <InputGroup.Text id="basic-addon3"><FaLock></FaLock></InputGroup.Text>
                                        </InputGroup>
                                        {errors.password && <span style={{ color: "red", fontSize: ".9rem" }}>{errors.password}</span>}
                                    </Col>
                                    <Col sm={10} className='login-input-box mb-3'>
                                        <InputGroup>
                                            {isConfirmVisible ? <FaEye className="pass-eyeslash" style={{ color: '#ca29f2' }} onClick={toggleConfirmPassword}></FaEye> : <FaEyeSlash className="pass-eyeslash" onClick={toggleConfirmPassword}></FaEyeSlash>}
                                            <Form.Control
                                                type={isConfirmVisible ? "text" : "password"}
                                                onChange={onChange}
                                                name='confirmPassword'
                                                value={confirmPassword}
                                                required
                                                placeholder="Confirm Password"
                                                aria-label="Confirm Password"
                                                aria-describedby="basic-addon4"
                                                className="password"
                                                minLength={8}
                                                autoComplete="off"
                                            />
                                            <InputGroup.Text id="basic-addon4"><FaLock></FaLock></InputGroup.Text>
                                        </InputGroup>
                                        {errors.confirmPassword && <span style={{ color: "red", fontSize: ".9rem" }}>{errors.confirmPassword}</span>}
                                    </Col>
                                </Form>
                                <Col className='submit-box text-center mt-4'>
                                    <Button value='Register' className='whiteBtn' size="lg" disabled={isLoading}
                                        onClick={handleClick}>{isLoading ? <div><Spinner size="sm" />Loading...</div> : 'Submit'}</Button>
                                    <Col className='mt-2 social-login-link mb-2'>
                                        <SocialMediaButton />
                                    </Col>
                                    <Card.Text className='signup-link'>
                                        Already have an account?<Link to="/login"> Login</Link>
                                    </Card.Text>
                                </Col>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row >
            </Container >


    );
}

export default Signup;