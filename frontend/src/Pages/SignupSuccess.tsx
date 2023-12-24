import React from 'react'
import { Container } from 'react-bootstrap';
import { FaFacebook, FaGooglePlus } from "react-icons/fa";
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import useCustomScroll from '../hooks/Scroll';
import { SocialMediaButton } from '../components/SocialMediaButton';



const SignupSuccess = () => {
    const scroll = useCustomScroll();
    return (
        <Container fluid className='login-container topzxcv-mnbv' >
            <Row className="justify-content-md-center">
                <Col xs={12} md={4} sm={4} className='outer-login p-3 pt-0'>
                    <Card className="w-100">
                        <Card.Body>
                            <Card.Title className="text-center" style={{ fontWeight: '700' }}>Congratulations!</Card.Title>
                            <Col sm={12} md={12} xs={12} className='submit-box text-center py-3 mt-4'>
                                <Card.Text className='mt-2 mb-3'>
                                    Your Filmfest account has been successfully created.
                                </Card.Text>
                                <Card.Text className='mb-5'>
                                    Please check your email to verify your account before streaming.
                                </Card.Text>
                                <Link to="/login">
                                    <Button type='submit' className='whiteBtn'>Login</Button>
                                </Link>
                                {/* <Col className='mt-2 social-login-link  mb-4'>
                                    <SocialMediaButton />
                                </Col> */}
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default SignupSuccess;