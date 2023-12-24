import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Row, Spinner, Stack } from 'react-bootstrap'
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import ResetPassword from '../components/ResetPassword';
import { Navigate } from 'react-router-dom';
import { FaTimes, FaUser, FaUpload } from 'react-icons/fa';
import defaultProfile from '../assets/images/default-profile.png'
import { updateUserProfile, updateProfilePicture } from '../redux/UserSlice';
import useCustomScroll from '../hooks/Scroll';


const Account = () => {
    const { loading, user, error, message, isLoggedIn } = useAppSelector(state => state.user) || [];
    useCustomScroll();
    const [show, setShow] = useState(false);
    const [editUsername, setEditUsername] = useState(false);
    const [newUsername, setNewUsername] = useState({ id: user._id, name: user.name });
    const dispatch = useAppDispatch();
    const handleShow = () => setShow(true);
    const [file, setFile] = useState<File>();


    const inputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append("user_id", user['_id']);

        dispatch<any>(updateProfilePicture(formData))
            .unwrap()
            .then((result: any) => {
                console.log(result);
            })
            .catch((rejectedValueOrSerializedError: any) => {
                console.log(rejectedValueOrSerializedError);
            });

    }, [file]);

    if (!isLoggedIn) return <Navigate to="/" />;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUsername({ ...newUsername, name: event.target.value });
    }


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) setFile(e.target.files[0]);
    };




    const submit = (event: any) => {
        event.preventDefault();

        if (!newUsername.name.trim() || newUsername.name == user.name) return inputRef.current?.focus();

        dispatch<any>(updateUserProfile(JSON.stringify(newUsername)))
            .unwrap()
            .then((result: any) => {
                console.log(result);
            })
            .catch((rejectedValueOrSerializedError: any) => {
                console.log(rejectedValueOrSerializedError);
            });

        setEditUsername(false);
    }

    return (
        <Container fluid className='account-section'>
            {loading
                ? <div style={{ textAlign: "center", color: "#FFFFFF" }}><Spinner></Spinner></div>
                : ''
            }
            <Row className='justify-content-center'>
                {error && <span style={{ color: 'red', height: '1.2rem', textAlign: 'center', marginBottom: ".6rem" }}>{error && error}</span>}
                {message && <span style={{ color: 'green', height: '1.2rem', textAlign: 'center', marginBottom: ".6rem" }}>{error && error}</span>}
                <Col className='account-container p-1'>
                    <Stack gap={3} className='account-box'>
                        <div className="p-2 text-center d-grid justify-content-center user-profile-box">
                            <div className='profile-edit'>
                                {user.image ? <img className='profile-pic' src={user.image} alt={user.name} /> : <FaUser></FaUser>}
                                <label htmlFor="photo-upload" className="custom-file-upload fas">
                                    <div className="img-wrap img-upload" >
                                        <FaUpload></FaUpload>
                                    </div>
                                    <input id="photo-upload" type="file" style={{ display: 'none' }} name="image" value="" onChange={handleImageChange} accept="image/png, image/jpg, image/jpeg" />
                                </label>
                            </div>
                        </div>
                        <div className="p-1 text-center"><span>{user && user["email"]}</span></div>
                        <div className="p-1 text-center">
                            {
                                editUsername
                                    ? <div className='update-name-box'><input ref={inputRef} className="profile-name-input" name="name" type="text" value={newUsername.name} onChange={onChange} required minLength={1} /> <FaTimes onClick={() => { setEditUsername(false); }}></FaTimes></div>
                                    : <span>{user && user["name"]}</span>
                            }
                        </div>
                        <div className="p-2 d-grid justify-content-center account-button my-1">
                            {
                                editUsername
                                    ? <Button onClick={submit} autoFocus>Update</Button>
                                    : <Button onClick={() => { setEditUsername(true); }} autoFocus>Edit</Button>
                            }
                            <Button onClick={handleShow}>Reset Password</Button>
                        </div>
                    </Stack>
                </Col>
            </Row>
            {show && <ResetPassword show={show} setShow={setShow} />}
        </Container>
    )
}

export default Account