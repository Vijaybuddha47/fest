import { useState } from 'react';
import { Container, Form, Modal, Button, Col } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { resetPassword, removeMessage } from '../redux/UserSlice';

const ResetPassword = ({ show, setShow }: any) => {
    const { user, error } = useAppSelector(state => state.user) || [];
    const dispatch = useAppDispatch();
    const [isOldVisible, setOldVisible] = useState(false);
    const [isNewVisible, setNewVisible] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [errors, setErrors] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const [parameters, setParameter] = useState({
        id: user ? user._id : '',
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const validateErrors = {
        current_password: "",
        new_password: "",
        confirm_password: "",
    };

    const handleClose = () => setShow(false);

    const submitResetPassword = () => {
        if (!parameters.current_password.trim()) validateErrors.current_password = "Current Password field must be filled.";

        if (!parameters.new_password.trim()) validateErrors.new_password = "New Password field must be filled.";
        else if (parameters.new_password.length < 8) validateErrors.new_password = "New Password should be at least 8 charactors.";

        if (!parameters.confirm_password.trim()) validateErrors.confirm_password = "Confirm Password field must be filled.";
        else if (parameters.new_password.trim() !== parameters.confirm_password.trim()) validateErrors.confirm_password = "Confirm password must be same.";

        setErrors(validateErrors);
        // console.log(validateErrors);

        const isError = Object.values(validateErrors).filter((val) => { return val != '' });
        // console.log(isError);

        if (isError.length === 0) {
            dispatch<any>(resetPassword({
                id: user ? user._id : '',
                current_password: parameters.current_password,
                new_password: parameters.new_password,
                confirm_password: parameters.confirm_password,
            }))
                .unwrap()
                .then((result: any) => {
                    console.log(result);
                    setShow(false);
                    // if (result.status == "A") {
                    //     console.log("success");
                    //     // localStorage.setItem("user", JSON.stringify(result));
                    //     setEmail('');
                    //     setPassword('')
                    //     // navigate('/');
                    // } else {
                    //     console.log("failed");
                    // }
                })
                .catch((rejectedValueOrSerializedError: any) => {
                    console.log(rejectedValueOrSerializedError);
                    setTimeout(function () { dispatch(removeMessage()); }, 3000);
                })
        }
    }

    const toggleOldPassword = () => {
        setOldVisible(!isOldVisible);
    }

    const toggleNewPassword = () => {
        setNewVisible(!isNewVisible);
    }

    const toggleConfirmPassword = () => {
        setConfirmVisible(!isConfirmVisible);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // if (name === 'confirm_password' && value !== parameters.new_password) {
        //     setErrors({
        //         current_password: "",
        //         new_password: "",
        //         confirm_password: "Confirm password must be same.",
        //     });
        // } else {
        setParameter({ ...parameters, [name]: value });
        // }
        console.log(parameters);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} dialogClassName="modal-50w" className='reset-password-popup' centered>
                <Modal.Header closeButton closeVariant='white' className='pb-5 pt-4'>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <div style={{ color: 'red', textAlign: 'center', backgroundColor: 'transparent', marginTop: '2px', paddingBottom: '15px' }}>{error}</div>}
                    <Form>
                        <Col sm={{ span: 10, offset: 1 }}>
                            <Form.Group className="mb-3 reset-field" controlId="exampleForm.ControlInput1">
                                <FaLock className="pass-lock"></FaLock>
                                <Form.Control
                                    type={!isOldVisible ? "password" : "text"}
                                    placeholder="Current Password"
                                    name='current_password'
                                    autoFocus
                                    required
                                    value={parameters.current_password}
                                    onChange={onChange}
                                />
                                {isOldVisible ? <FaEye className="pass-eyeslash" style={{ color: '#ca29f2' }} onClick={toggleOldPassword}></FaEye> : <FaEyeSlash className="pass-eyeslash" onClick={toggleOldPassword}></FaEyeSlash>}
                                {errors.current_password ? <span style={{ fontSize: '12px', color: 'red', textAlign: 'center' }}>{errors.current_password}</span> : ''}
                            </Form.Group>
                            <Form.Group className="mb-3 reset-field" controlId="exampleForm.ControlInput2">
                                <FaLock className="pass-lock"></FaLock>
                                <Form.Control
                                    type={!isNewVisible ? "password" : "text"}
                                    placeholder="New Password"
                                    name='new_password'
                                    required
                                    value={parameters.new_password}
                                    onChange={onChange}
                                />
                                {isNewVisible ? <FaEye className="pass-eyeslash" style={{ color: '#ca29f2' }} onClick={toggleNewPassword}></FaEye> : <FaEyeSlash className="pass-eyeslash" onClick={toggleNewPassword}></FaEyeSlash>}
                                {errors.new_password ? <span style={{ fontSize: '12px', color: 'red', textAlign: 'center' }}>{errors.new_password}</span> : ''}
                            </Form.Group>
                            <Form.Group className="mb-3 reset-field" controlId="exampleForm.ControlInput2">
                                <FaLock className="pass-lock"></FaLock>
                                <Form.Control
                                    type={!isConfirmVisible ? "password" : "text"}
                                    placeholder="Confirm Password"
                                    name='confirm_password'
                                    required
                                    value={parameters.confirm_password}
                                    onChange={onChange}
                                />
                                {isConfirmVisible ? <FaEye className="pass-eyeslash" style={{ color: '#ca29f2' }} onClick={toggleConfirmPassword}></FaEye> : <FaEyeSlash className="pass-eyeslash" onClick={toggleConfirmPassword}></FaEyeSlash>}
                                {errors.confirm_password ? <span style={{ fontSize: '12px', color: 'red', textAlign: 'center' }}>{errors.confirm_password}</span> : ''}
                            </Form.Group>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='pb-5'>
                    <Button variant="primary" onClick={submitResetPassword}>
                        Reset
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ResetPassword