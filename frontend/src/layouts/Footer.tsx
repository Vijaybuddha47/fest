import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Icon from 'react-bootstrap-icons';
import { Link, NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../redux/hooks';

function Footer() {
    const { isLoggedIn } = useAppSelector(state => state.user) || [];

    return (
        <>
            <footer>
                <Container fluid className="custom-screen-padding">
                    <Row className="topFooter">
                        <Col>
                            <div className="footer-about-heading"><h4><span>FILM FEST</span></h4></div>
                            <div className="footer-about-desc">
                                Dive into a world of exceptional short films, engage with the creative community by voting for your favorites, and celebrate the art of filmmaking in our monthly online festival – all for free.
                            </div>
                        </Col>
                        <Col>
                            <div className="footer-about-heading"><h4>Resources</h4></div>
                            <ul className="footer-link">
                                <li><NavLink to="/">Home</NavLink></li>
                                <li><NavLink to="/festival">Festival</NavLink></li>
                                <li><NavLink to="/genres">Genres</NavLink></li>
                                <li><NavLink to="/about">About</NavLink></li>
                                <li><NavLink to="/submit-film" target='_blank'>Submit Film</NavLink></li>
                            </ul>
                        </Col>
                        <Col>
                            <div className="footer-about-heading"><h4>Support</h4></div>
                            <ul className="footer-link">
                                {
                                    isLoggedIn
                                        ? <li><Link to="/account">My Account</Link></li>
                                        : <li><Link to="/login">Login</Link></li>
                                }

                            </ul>
                        </Col>
                        <Col>
                            <div className="footer-about-heading"><h4>Connect</h4></div>
                            <ul className="social-media-icon">
                                {/* <li className="facebook"><Icon.Facebook></Icon.Facebook></li>
                                <li className='twitter'><Icon.Twitter></Icon.Twitter></li> */}
                                <Link to="https://www.instagram.com/filmfestt/" target="_blank"><li className='instagram'><Icon.Instagram></Icon.Instagram></li></Link>
                                {/* <li className='youtube'><Icon.Youtube></Icon.Youtube></li> */}
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='border-in-footer'></div>
                            <p className="bottomFooterTxt">©<span> Filmfest</span> 2023. All Rights Reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};
export default Footer;