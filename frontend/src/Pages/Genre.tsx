import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-multi-carousel';
import { FaHeart, FaInfoCircle, FaPlay, FaHandPointUp } from "react-icons/fa";
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import configData from '../config/Config';
import { convertDuration, makeUrlSlug, generateKey } from '../Utils/Utils';
import useCustomScroll from '../hooks/Scroll';
import AppLoader from '../components/AppLoader';
import Hover from '../components/Hover';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

const genreUrl: string = configData.API_URL + "/genre-data";
// const genreDataUrl: string = configData.API_URL + "/getfilm-bygenre";
const genreDataUrl: string = configData.API_URL + "/get-film-by-genre";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 7
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 5
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3
    }
};

const Genre = () => {
    useCustomScroll();
    const { loading, user, error, message, isLoggedIn } = useAppSelector(state => state.user) || [];
    const [loader, setLoader] = useState(true);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [genres, setGenres] = useState([]);
    const [data, setData] = useState([]);
    const [errors, setError] = useState(false);

    useEffect(() => {

        const genreList = async () => {
            // setLoader(!loader);
            await axios.get(genreUrl)
                .then(res => {
                    console.log(res);
                    if (res.data.genresList.length > 0) {
                        setGenres(res.data.genresList);
                        getGenreData(res.data.genresList[0]['_id']);
                    }
                    else console.log("No data found.");
                    // setLoader(!loader);
                })
                .catch(error => {
                    console.log(error);
                    // setLoader(!loader);
                });
        }

        genreList();

    }, []);

    const getGenreData: any = async (id: string) => {
        console.log(id);
        setLoader(true);
        // const url = genreDataUrl + '/' + id;
        await axios.post(genreDataUrl, { genre_id: id, user_id: isLoggedIn ? user._id : '' })
            .then(res => {
                console.log(res);
                if (res.data.data.length > 0) {
                    setError(false);
                    setData(res.data.data);
                }
                else {
                    setError(true);
                    setData([]);
                }
                setLoader(false);

            })
            .catch(error => {
                console.log(error);
                setError(true);
                setData([]);
                setLoader(false);
            });
    }

    return (
        <>
            <Row className='w-100 genre-list-container mx-0'>
                <Col sm={11} className='p-0'>
                    <div className='innerGenre'>
                        <Carousel responsive={responsive}>
                            {
                                genres.map(person => {
                                    return (<Col className="genre-list default-btn" index={person['_id']} key={person['_id']} onClick={() => getGenreData(person['_id'])}>{person['genre']}</Col>)
                                })
                            }
                        </Carousel>
                    </div>
                </Col >
                <Col sm={12} className='genre-item-container mt-5 mb-3'>
                    {errors ? <span style={{ color: '#FFFFFF', fontSize: '1.2rem', textAlign: 'center' }}>No Data Found</span> : ''}
                    {
                        loader
                            ? <AppLoader />
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
                                                                            return <span key={generateKey(data.genre)}>{data.genre}</span>
                                                                        })
                                                                    }
                                                                    {/* <span key={generateKey(item._id + "10")}>ADVENTURE</span><span key={generateKey(item._id + "17")}>ACTION</span><span key={generateKey(item._id + "18")}>FANTASY</span> */}
                                                                </li>
                                                            </ul>
                                                            <ul className="thumbnal_actionsUl" key={generateKey(item._id + "11")}>
                                                                <li key={generateKey(item._id + "12")}><button className="btn default-btn whiteBtn thumbHeart" key={generateKey(item._id + "13")}>
                                                                    {/* <FaHeart key={generateKey(item._id + "22")} ></FaHeart> */}
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
        </>
    );
}

export default Genre;