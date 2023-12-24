import logo from '../assets/images/logo.png';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { userLogout } from '../redux/UserSlice';
import defaultProfile from '../assets/images/default-profile.png'
import { FaSearch, FaUser } from 'react-icons/fa';
import useServerInfo from '../hooks/ServerInfo';
import { imageOnErrorHandler } from '../Utils/Utils';
import { useEffect, useState } from 'react';

const Header = () => {
    const { loading, error, isLoggedIn, user } = useAppSelector(state => state.user) || [];
    console.log(loading, user, error, isLoggedIn);
    useServerInfo();
    const dispatch = useAppDispatch();
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);

    useEffect(() => {
        if (showLogoutMessage) {
            // setShowLogoutMessage(true);
            setTimeout(() => {
                setShowLogoutMessage(false);
            }, 1000);
        }
    }, [showLogoutMessage])

    const logout = (e: any) => {
        console.log("logout");
        const payload: any = {
            loading: false,
            user: [],
            error: "",
            isLoggedIn: false
        }
        const isLogout: any = dispatch(userLogout());
        console.log(isLogout);
        isLogout && setShowLogoutMessage(true);
    }


    return (
        <>
            <Navbar expand="lg" sticky="top">
                <Container fluid className="custom-screen-padding">
                    <Link to="/" className="navbar-brand"><img src={logo} alt="Filmfest" width="160" /></Link>
                    <Link to="https://filmfest.net/submit-film" className='m-0 d-none filmBtn' target='_blank'><Button className="btn default-btn mx-2">Submit Film</Button></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="screen-nav centerNav me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                        >
                            <NavLink to="/">Home</NavLink >
                            <NavLink to="/festival">Festival</NavLink >
                            <NavLink to="/genres">Genres</NavLink >
                            <NavLink to="/about">About</NavLink >
                        </Nav>
                        <Nav
                            className="my-2 my-lg-0 pt-1"
                            style={{ maxHeight: '100px' }}
                        >
                            <Link className="nav-search-icon mx-4" to="/search" title="Search"><FaSearch size="25" /></Link>
                            <Link to="https://filmfest.net/submit-film" className='m-0' target='_blank'><Button className="deskfilmbtn btn default-btn mx-2">Submit Film</Button></Link>
                            {
                                isLoggedIn
                                    ? <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic"><Image src={user.image} onError={imageOnErrorHandler} roundedCircle style={{ width: "2rem", height: "2rem", margin: "0 4px" }} />{user && user['name']}</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Link to="/account">Account</Link>
                                            <Link to="/favorite">Favorites</Link>
                                            <Dropdown.Item eventKey="1" onClick={logout} className='m-0 logout-btn'>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    : <Link to="/login" className='m-0'><Button className="navbar-button ">Login</Button></Link>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {
                showLogoutMessage && <Container className='logout-message'><span>Logout successfully.</span></Container>
            }

        </>
    );
};

export default Header;