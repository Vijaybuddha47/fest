import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import { Outlet } from "react-router-dom";
import { Container } from 'react-bootstrap';

function Layout() {
    return (
        <>
            <Container fluid className='p-0 m-0'>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </Container>
        </>
    );
};
export default Layout;