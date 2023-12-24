import React, { useState, useEffect } from 'react'
import { FaHeart, FaInfoCircle, FaPlay, FaHandPointUp } from "react-icons/fa";
import axios from 'axios';
import configData from '../config/Config';
import { convertDuration, makeUrlSlug, generateKey } from '../Utils/Utils';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import useCustomScroll from '../hooks/Scroll';
import AppLoader from '../components/AppLoader';
import Hover from '../components/Hover';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

// const searchUrl: string = configData.API_URL + "/search-data";

// const searchUrl: string = "http://localhost:5000/get-search";

const Search = () => {
    useCustomScroll();
    const { loading, error, isLoggedIn, user } = useAppSelector(state => state.user) || [];
    const [loader, setLoader] = useState(true);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [searchField, setSearchField] = useState("");
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState(false);


    const handleChange = (e: any) => {
        setSearchField(e.target.value);
    };

    useEffect(() => {
        const getData = setTimeout(async () => {
            console.log("hello");
            setLoader(true);
            let searchUrl = "http://localhost:5000/get-search" + (isLoggedIn ? '/' + user._id : '');
            await axios.post(searchUrl, {
                "title": searchField
            })
                .then(res => {
                    console.log(res);
                    setData(res.data.search_result);
                    setLoader(false);
                    setErrors(false);
                })
                .catch(error => {
                    console.log(error);
                    setErrors(true);
                    setLoader(false);
                });
        }, 2000)

        return () => clearTimeout(getData)

    }, [searchField]);


    return (
        <Container fluid className='p-0'>
            <Row className='w-100 search-list-container mx-0'>
                <Col sm={12} className='p-0 text-center mt-5 mb-1'>
                    <Col className='search-text-heading'><h4>Search by Title, Filmmaker, Genre...</h4></Col>
                </Col >
                <Col sm={12} className='p-0 text-center mt-1 d-flex justify-content-center'>
                    <Col sm={{ span: 11 }}>
                        <input type='text' value={searchField} onChange={handleChange} className='form-control search-input m-0' placeholder="Search by Title, Filmmaker, Genre..."></input>
                    </Col>
                </Col >
                <Col sm={12} className='search-item-container mt-5 mb-3'>
                    {errors ? <span style={{ color: '#FFFFFF', fontSize: '1.2rem', textAlign: 'center', display: 'block' }}>No Data Found</span> : ''}
                    {
                        loader
                            ? <div style={{ textAlign: "center", color: "#FFFFFF" }}><Spinner></Spinner></div>
                            : data
                                ? Object.values(data).map((item: any, index: any) => {
                                    let urlSlug = '/details/' + makeUrlSlug(item.title) + '/' + item._id;
                                    let hoverId = makeUrlSlug(item.title + index);
                                    return (
                                        <Link className='detail-link' to={urlSlug} state={{ data: item }} key={generateKey(item._id + "0")} id={hoverId} >
                                            <li key={index} className='festival-list-item'>
                                                <div className="slider-item" key={generateKey(item._id)}>
                                                    <img src={item.thumbnail} alt={item.title} className='fullThumbnail' key={generateKey(item.banner + "23")}></img>
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
                                            </li>
                                        </Link>
                                    )
                                })
                                : ''
                    }
                </Col>
            </Row >
        </Container>
    );
}

export default Search;