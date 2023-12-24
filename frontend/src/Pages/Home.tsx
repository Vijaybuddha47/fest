import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import BannerSlider from '../components/BannerSlider';
import Slider from '../components/Slider';
import configData from '../config/Config';
import useCustomScroll from '../hooks/Scroll';


const Home = () => {
    useCustomScroll();
    return (
        <>
            <BannerSlider />
            <Container fluid className='custom-main-screen-padding'>
                <Slider />
            </Container>
        </>
    );
};
export default Home;