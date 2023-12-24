import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import axios from 'axios';
import configData from '../config/Config';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { convertDuration, makeUrlSlug, generateKey } from "../Utils/Utils";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MessagePopup from './MessagePopup';



const BannerSlider = () => {
    const location = useLocation();
    const { loading, user, error, message, isLoggedIn } = useAppSelector(state => state.user) || [];
    const [banners, setBanners] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getBannerData();
    }, []);

    let sliderUrl: string = configData.API_URL;

    const getBannerData = async () => {
        location.pathname.includes('festival')
            ? (sliderUrl = sliderUrl + "/festival-slider" + (user._id ? '/' + user._id : ''))
            : (sliderUrl = sliderUrl + "/slider-data" + (user._id ? '/' + user._id : ''))
        console.log(sliderUrl);
        await axios.get(sliderUrl)
            .then(res => {
                console.log(res);
                if (res.data.slider.length > 0) setBanners(res.data.slider);
                else console.log("No data found.");
            })
            .catch(error => {
                console.log(error);
            });
    };


    const bannerList = banners.map((value: any, index: any) => {
        const name: any = value.filmmaker.map((item: any, i: any) => item.name);
        let urlSlug = '/details/' + makeUrlSlug(value.title) + '/' + value._id;

        return (
            <Carousel.Item interval={1000000} key={generateKey(value._id)}>
                <img
                    className="d-block w-100"
                    src={value.banner}
                    alt={value.title}

                    key={generateKey(value._id)}
                />
                <Carousel.Caption key={generateKey(value._id)}>
                    <div className="slider-item-description" key={generateKey(value._id)}>
                        <div className='d-flex'> <h2 className="slider-item-Title" key={generateKey(value._id)}>{value.title} </h2><span className="quality" key={generateKey(value._id)}>HD</span></div>
                        <ul className="slider-item-info" key={generateKey(value._id)}>
                            <li className="slider-item-category" key={generateKey(value._id)}>{value.rating}</li>
                            <li className="slider-item-genre" key={generateKey(value._id)}>
                                |
                                {
                                    value.genre.map((item: any, i: any) => {
                                        if (i < 2) return <span key={generateKey(item.genre)}>{item.genre}</span>
                                    })
                                }
                                |
                            </li>
                            <li className="slider-item-duration" key={generateKey(value._id)}> {convertDuration(value.duration)}</li>
                        </ul>
                        <p className="slider-item-maker" key={generateKey(value._id)}>Filmmaker : <span key={generateKey(value._id)}>{name ? name.join(", ") : "NA"}</span></p>
                        <p className="slider-item-short-desc" key={generateKey(value._id)}>{value.short_description}</p>
                        <Col key={generateKey(value._id)}>
                            {
                                isLoggedIn
                                    ? <Link to={'/' + makeUrlSlug(value.title) + '/player/' + value._id}><Button className='default-btn' key={generateKey(value._id)}><FaPlay key={generateKey(value._id)} /> Watch Now</Button> </Link>
                                    : <Button className='default-btn' key={generateKey(value._id)} onClick={() => setShowPopup(!showPopup)}><FaPlay key={generateKey(value._id)} /> Watch Now</Button>
                            }
                            <Button className='default-btn whiteBtn' onClick={() => navigate(urlSlug)} key={generateKey(value._id)}><FaInfoCircle key={generateKey(value._id)} />More Info</Button>
                        </Col>
                    </div>
                </Carousel.Caption>
                <div className='overlay' key={generateKey(value._id)}></div>
            </Carousel.Item>
        )
    });

    return (
        <Carousel controls={false} pause={'hover'} >
            {bannerList ? bannerList : ''}
            {showPopup && <MessagePopup show={showPopup} setShowPopup={setShowPopup} />}
        </Carousel>
    );
}

export default BannerSlider;