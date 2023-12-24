import React from 'react'
import { Container, Row, Modal, Button, Col } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from "react-router-dom";
import useCustomScroll from '../hooks/Scroll';

type ButtonProps = {
    setShowPopup: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};


const MessagePopup = ({ show, setShowPopup }: any) => {
    useCustomScroll();
    const navigate = useNavigate();

    const createAccountLink = () => {
        setShowPopup(false);
        navigate('/sign-up');
    }

    return (
        <Container fluid >
            <Row className="justify-content-center">
                <Col xs="12" md="4">
                    <Modal show={show} onHide={() => setShowPopup(false)} dialogClassName="modal-30w" className='message-popup col-xs-12 col-md-4 col-lg-4' centered>
                        <Modal.Header closeVariant='white' className='pb-3 pt-4'>
                            <Modal.Title>Watch & Vote – All for Free</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='pb-0'>
                            <p className='text-message'>
                                You’re just a step away from unlimited access to Filmfest! By creating a free account, you can:</p>
                            <p className='text-message'>
                                Enjoy Full Access: Watch any film on Filmfest, completely for free.
                            </p>
                            <p className='text-message'>
                                Have Your Say: Vote for your favorite films to help decide the winners.
                            </p>
                        </Modal.Body>
                        <Modal.Footer className='pb-4'>
                            <Button variant="primary" onClick={createAccountLink}>
                                CREATE FREE ACCOUNT
                            </Button>
                            <p className='page-links mt-2'>
                                Already have an account?<Link to="/login"> Login</Link>
                            </p>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    )
}

export default MessagePopup