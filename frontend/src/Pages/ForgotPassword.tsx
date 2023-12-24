import React, { useEffect, useState } from "react";
import { useAppSelector } from '../redux/hooks';
import { useRouteError, useSearchParams, useParams, Navigate, Link } from "react-router-dom";
import axios from "axios";
import configData from "../config/Config";
import { Container, Row, Col, Spinner, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import useCustomScroll from '../hooks/Scroll';

interface SignUpFormState {
    id: string;
    password: string
    confirm_password: string;
}

const forgotPasswordURL = configData.API_URL + "/forgot-password";

const ForgotPassword = () => {
    useCustomScroll();
    const { isLoggedIn } = useAppSelector(state => state.user) || [];
    const [isPasswordVisible, setpasswordVisible] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [requestError, setRequestError] = useState({
        message: '',
        error: false
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        id: "",
        password: "",
        confirm_password: ""
    });

    const [formData, setFormData] = useState<SignUpFormState>({
        id: "",
        password: "",
        confirm_password: ""
    });

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

    const { id } = useParams();
    console.log(id);
    if (!id) return <Navigate to='/' />

    const validateErrors = {
        id: "",
        password: "",
        confirm_password: ""
    };

    const togglePassword = () => {
        setpasswordVisible(!isPasswordVisible);
    }

    const toggleConfirmPassword = () => {
        setConfirmVisible(!isConfirmVisible);
    }

    if (isLoggedIn) return <Navigate to="/" />;

    const { password, confirm_password } = formData;

    // const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.password.trim()) validateErrors.password = "Password field must be filled.";
        else if (formData.password.length < 8) validateErrors.password = "Password must be at least 8 characters.";

        if (formData.password.trim() != formData.confirm_password.trim()) validateErrors.confirm_password = "Password do not match.";

        setErrors(validateErrors);

        const isError = Object.values(validateErrors).filter((val) => { return val != '' });

        if (isError.length === 0) {
            setLoading(true);
            const data = {
                id,
                password,
                confirm_password,
            };

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                };
                const body = JSON.stringify(data);
                await axios.post(forgotPasswordURL, body, config)
                    .then((response) => {
                        console.log(response);
                        if (response.data.status) {
                            setLoading(false);
                            setFormData({
                                id: "",
                                password: "",
                                confirm_password: ""
                            });
                            setMessage(response.data.message);
                            setIsSuccess(true);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response.data.message);
                        setRequestError({ message: error.response.data.message, error: true });
                        setLoading(false);
                        setIsSuccess(false);
                        setTimeout(function () {
                            setRequestError({ message: "", error: false });
                        }, 3000);
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
        <Container fluid className='login-container topzxcv-mnbv'>
            < Row className="justify-content-md-center" >
                {isSuccess && <span style={{ color: 'green', textAlign: 'center' }}>{message ? message : 'Password has been reset. Please login with new password.'}</span>
                }
                {requestError.error && <span style={{ color: 'red', textAlign: 'center' }}>{requestError.message}</span>}
                <Col xs={12} md={4} sm={4} className='outer-login p-3 pt-0'>
                    <Card className="w-100">
                        <Card.Body>
                            <Card.Title className="text-center mt-4">Reset Password</Card.Title>
                            <Form className='mt-5'>
                                <Col sm={10} className='login-input-box mb-4'>
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
                                            autoFocus
                                        />
                                        <InputGroup.Text id="basic-addon3"><FaLock></FaLock></InputGroup.Text>
                                    </InputGroup>
                                    {errors.password && <span style={{ color: "red", fontSize: ".9rem" }}>{errors.password}</span>}
                                </Col>
                                <Col sm={10} className='login-input-box mb-4'>
                                    <InputGroup>
                                        {isConfirmVisible ? <FaEye className="pass-eyeslash" style={{ color: '#ca29f2' }} onClick={toggleConfirmPassword}></FaEye> : <FaEyeSlash className="pass-eyeslash" onClick={toggleConfirmPassword}></FaEyeSlash>}
                                        <Form.Control
                                            type={isConfirmVisible ? "text" : "password"}
                                            onChange={onChange}
                                            name='confirm_password'
                                            value={confirm_password}
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
                                    {errors.confirm_password && <span style={{ color: "red", fontSize: ".9rem" }}>{errors.confirm_password}</span>}
                                </Col>
                            </Form>
                            <Col className='submit-box text-center mt-4'>
                                <Button value='Register' className='whiteBtn' size="lg" disabled={isLoading}
                                    onClick={handleClick}>{isLoading ? <div><Spinner size="sm" />Loading...</div> : 'Submit'}</Button>
                                <Card.Text className='signup-link mt-4 mb-5'>
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

export default ForgotPassword