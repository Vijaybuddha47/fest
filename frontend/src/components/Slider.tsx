import React, { useState, useEffect, useRef } from 'react'
import Carousel from 'react-multi-carousel';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import Item from './Item';
import axios from 'axios';
import configData from '../config/Config';
import { FaHeart, FaInfoCircle, FaPlay, FaHandPointUp } from "react-icons/fa";
import { convertDuration, makeUrlSlug, generateKey } from "../Utils/Utils";
import { Video } from './Video';
import HoverPlayer from './HoverPlayer';
import Hover from './Hover';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import AppLoader from './AppLoader';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const Slider = () => {
    const location = useLocation();
    const { loading, user, error, message, isLoggedIn } = useAppSelector(state => state.user) || [];
    const [categories, setCategories] = useState([]);
    const [loader, setLoader] = useState(true);

    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    useEffect(() => {
        getHomeData();
    }, []);

    const getHomeData = async () => {
        let homeUrl: string = '';
        location.pathname.includes('festival')
            ? (homeUrl = configData.API_URL + "/festival-slider" + (user._id ? '/' + user._id : ''))
            : (homeUrl = configData.API_URL + "/home-data" + (user._id ? '/' + user._id : ''))

        await axios.get(homeUrl)
            .then(res => {
                console.log(res);
                if (res.data.categories.length > 0) setCategories(res.data.categories);
                else console.log("Data not found.");
                setLoader(!loader);
            })
            .catch(error => {
                console.log(error);
                setLoader(!loader);
            });
    };

    const itemList = Object.values(categories).map((value: any, index: any) => {
        return (
            <Row key={generateKey(value._id + "0")}>
                <div className="slider_title_box" key={generateKey(value._id + "1")}>
                    <div className="list_heading" key={generateKey(value._id + "2")}><h3 key={generateKey(value._id + "3")}>{value.cat_name}</h3></div>
                </div>
                <Carousel className='mainmultisliders' responsive={responsive} key={generateKey(value._id + "4")}>
                    {
                        value['streams'].map((item: any, index: any) => {
                            let urlSlug = 'details/' + makeUrlSlug(item.title) + '/' + item._id;
                            let hoverId = makeUrlSlug(item.title + index);
                            return <Link className='detail-link' to={urlSlug} state={{ data: item }} key={generateKey(item._id + "0")} id={hoverId} >
                                <div className="slider-item" key={generateKey(value["streams"]._id)} >
                                    <img src={item.thumbnail} alt={item.title} className='fullThumbnail' key={generateKey(item.banner + "23")} ></img>
                                    <div className="thumbnailBx" key={generateKey(item._id + item.title)}>
                                        <Hover url={item.stream_file} poster={item.banner} isVideoPlaying={isVideoPlaying} id={hoverId} />
                                        <div className="thumbData" key={generateKey(item._id + "1")}>
                                            <div className='d-flex'>
                                                <h6 className="thumbTitle" key={generateKey(item._id + "2")}>{item.title}</h6>
                                                <span className="quality" key={generateKey(item._id + "3")}>HD</span>
                                            </div>
                                            <ul className="subInfo" key={generateKey(item._id + "4")}>
                                                <li className="category" key={generateKey(item._id + "5")}>{item.rating}</li>
                                                <li className="duration" key={generateKey(item._id + "6")}>{convertDuration(item.duration)}</li>
                                                {/* <li><span className="quality" key={generateKey(item._id + "3")}>HD</span></li> */}
                                            </ul>
                                            <p className="thumbDesc" key={generateKey(item._id + "7")}>{item.short_description} </p>
                                            <ul className="subInfo" key={generateKey(item._id + "8")}>
                                                <li className="genre" key={generateKey(item._id + "9")}>
                                                    {
                                                        item.genre.map((data: any, i: any) => {

                                                            if (i < 3) return <span key={generateKey(data.genre)}>{data.genre}</span>
                                                        })
                                                    }
                                                </li>
                                            </ul>
                                            <ul className="thumbnal_actionsUl" key={generateKey(item._id + "11")}>
                                                <li key={generateKey(item._id + "12")}><button className="btn default-btn whiteBtn thumbHeart" key={generateKey(item._id + "13")}>
                                                    {item.type == 'M'
                                                        ? <FaHeart key={generateKey(item._id + "22")} className={item.is_fav ? 'my-fav-icon' : 'fav-icon'}></FaHeart>
                                                        : <FaHandPointUp key={generateKey(item._id + "22")} className={item.is_vote ? 'my-fav-icon' : 'vote-icon'}></FaHandPointUp>
                                                    }
                                                </button></li>
                                                <li key={generateKey(item._id + "14")}>
                                                    <button className="btn default-btn thumbInfo" key={generateKey(item._id + "15")}><FaInfoCircle key={generateKey(item._id + "20")}></FaInfoCircle></button>
                                                    <button className="btn default-btn thumbPlay" key={generateKey(item._id + "16")}><FaPlay key={generateKey(item._id + "21")}></FaPlay></button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        })
                    }
                </Carousel>
            </Row>
        )
    });

    return (
        <Container fluid className='p-0 m-0 home-item-list' >
            {
                categories
                    ? loader ? <AppLoader /> : itemList
                    : '<div className="data-not-found">Data not found.</div>'}
        </Container>
    );
}

export default Slider;