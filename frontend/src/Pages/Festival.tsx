import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { FaHeart, FaInfoCircle, FaPlay, FaHandPointUp } from "react-icons/fa";
import BannerSlider from '../components/BannerSlider';
import axios from 'axios';
import configData from '../config/Config';
import { convertDuration, makeUrlSlug, generateKey } from '../Utils/Utils';
import useCustomScroll from '../hooks/Scroll';
import AppLoader from '../components/AppLoader';
import Hover from '../components/Hover';
import { Link } from 'react-router-dom';

const festivalUrl: string = configData.API_URL + "/festival-data";

export const Festival = () => {
    useCustomScroll();
    const [festival, setFestival] = useState([]);
    const [loader, setLoader] = useState(true);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);


    useEffect(() => {

        const getFestivalData = async () => {
            await axios.get(festivalUrl)
                .then(res => {
                    console.log(res);
                    if (res.data.festival.length > 0) setFestival(res.data.festival);
                    else console.log("No data found.");
                    setLoader(!loader);
                })
                .catch(error => {
                    console.log(error);
                    setLoader(!loader);
                });
        };

        getFestivalData();

    }, []);


    const itemList = Object.values(festival).map((item: any, index: any) => {
        let urlSlug = '/details/' + makeUrlSlug(item.title) + '/' + item._id;
        let hoverId = makeUrlSlug(item.title + index);
        return (
            <Link className='detail-link' to={urlSlug} state={{ data: item }} key={generateKey(item._id + "0")} id={hoverId} >
                <li key={index} className='festival-list-item'>
                    <div className="slider-item" key={generateKey(item._id)}>
                        <img src={item.thumbnail} alt={item.title} className='fullThumbnail' key={generateKey(item.banner + "23")}></img>
                        <div className="thumbnailBx" key={generateKey(item._id + item.title)}>
                            <Hover url={item.stream_file} poster={item.banner} isVideoPlaying={isVideoPlaying} id={hoverId} />
                            {/* <a href="detail" key={generateKey(item._id + "0")}><img src={item.thumbnail} alt={item.title} key={generateKey(item._id + item.thumbnail)}></img></a> */}
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
    });

    return (
        <>
            <main>
                <BannerSlider />
                <Container fluid className='festival-list-container'>
                    <ul>
                        {
                            itemList
                                ? loader ? <AppLoader /> : itemList
                                : '<div className="data-not-found">Data not found.</div>'
                        }
                    </ul>
                </Container>
            </main>
        </>
    );
};

export default Festival;