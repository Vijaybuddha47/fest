import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FaPlay, FaHeart } from "react-icons/fa";
import { Container, Spinner } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import useCustomScroll from '../hooks/Scroll';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { convertDuration, makeUrlSlug, generateKey, imageOnErrorHandler } from "../Utils/Utils";
import MessagePopup from '../components/MessagePopup';
import axios from "axios";
import configData from "../config/Config";
import Item from '../components/Item';
import Carousel from 'react-multi-carousel';

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

interface IStream {
    actor: [],
    banner: string,
    director: [],
    duration: number,
    filmmaker: [],
    genre: [],
    long_description: string,
    producer: [],
    rating: string,
    short_description: string,
    stream_file: string,
    thumbnail: string,
    title: string,
    trailer: string,
    is_fav: boolean,
    is_vote: boolean,
    _id: string,
    type: string
}
const detailUrl: string = configData.API_URL + "/item-detail";

function Detail() {
    useCustomScroll();
    const { loading, user, error, message, isLoggedIn } = useAppSelector(state => state.user) || [];
    const [fav, setFav] = useState(false);
    const [vote, setVote] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [stream, setStream] = useState<IStream>({
        actor: [],
        banner: '',
        director: [],
        duration: 0,
        filmmaker: [],
        genre: [],
        long_description: '',
        producer: [],
        rating: '',
        short_description: '',
        stream_file: '',
        thumbnail: '',
        title: '',
        trailer: '',
        is_fav: false,
        is_vote: false,
        _id: '',
        type: '',
    });
    const [relatedData, setRelatedData] = useState([]);
    const { id } = useParams();
    const [loader, setLoader] = useState(true);
    let navigate = useNavigate();
    console.log(id, loader);

    // console.log(stream);

    useEffect(() => {
        console.log("useEffect called", loader);
        const getDetailData = async () => {
            const param = {
                item_id: id,
                ...(isLoggedIn && { user_id: user['_id'] })
            }
            console.log(param);
            await axios.post(detailUrl, param)
                .then(res => {
                    console.log(res);
                    setStream(res.data.detail)
                    setFav(res.data.detail['is_fav']);
                    setVote(res.data.detail['is_vote']);
                    setRelatedData(res.data.related);
                    setLoader(false);
                    console.log(res.data.detail['is_fav'], fav);
                })
                .catch(error => {
                    console.log(error);
                    setLoader(false);
                });
        }
        getDetailData();
    }, []);

    const addRemoveFavorite = async () => {
        console.log("addRemoveFavorite");
        console.log(stream['is_fav'], fav);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            };
            const body = {
                "movie_id": id,
                "user_id": user['_id']
            };
            const url = configData.API_URL + "/add-favorite";
            console.log(url, body)
            await axios.post(url, body, config)
                .then((response) => {
                    console.log(response);
                    setStream({ ...stream, is_fav: !fav })
                    setFav(!fav);
                })
                .catch((error) => {
                    console.log(error);
                })

        } catch (e) {
            if (e instanceof Error) {
                // e is narrowed to Error!
                console.log(e.message);
            }
        }
    }

    const voteFestivals = async () => {
        console.log("voteFestivals");
        console.log(stream['is_vote'], vote);
        if (vote) return;
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            };
            const body = {
                "fest_id": id,
                "user_id": user['_id']
            };
            const url = configData.API_URL + "/vote";
            console.log(url, body)
            await axios.post(url, body, config)
                .then((response) => {
                    console.log(response);
                    setStream({ ...stream, is_vote: !vote })
                    setVote(!vote);
                })
                .catch((error) => {
                    console.log(error);
                })

        } catch (e) {
            if (e instanceof Error) {
                // e is narrowed to Error!
                console.log(e.message);
            }
        }
    }


    const refreshPage = (placeToGo: string) => {
        navigate(placeToGo, { replace: true });
        window.location.reload();
    }
    console.log(stream);

    const name = stream.filmmaker.map((item: any, i: any) => item.name);
    const mainFilmMaker = stream.filmmaker.length > 0 ? stream.filmmaker : [];


    return loader ? <div style={{ textAlign: "center", color: "#FFFFFF", width: '100%', height: '100vh', display: 'grid', placeItems: 'center' }}><Spinner></Spinner></div> : (
        <>
            <Container fluid className='p-0'>
                <Paper className='detailBanner'
                    sx={{
                        position: 'relative',
                        color: '#fff',
                        mb: 4,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${stream["banner"]})`,
                        height: `600px`
                    }}
                >
                    {<img style={{ display: 'none' }} src={stream.banner} alt={stream.title} />}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            left: 0,
                        }}
                    />
                    <Grid container>
                        <Grid item md={12}>
                            <Box className='slideContentBox'
                                sx={{
                                    position: 'relative',
                                    p: { xs: 2, md: 6 },
                                    pr: { md: 0 },
                                    marginTop: 14,
                                }}
                            >
                                <div className="slider-item-description">
                                    <div className='d-flex'>
                                        <h2 className="slider-item-Title">{stream.title}</h2>
                                        <span className="quality">HD</span>
                                    </div>
                                    <ul className="slider-item-info">
                                        <li className="slider-item-category">{stream.rating}</li>
                                        <li className="slider-item-genre">
                                            | {
                                                stream.genre.length > 0
                                                    ? stream.genre.map((data: any, i: number) => {
                                                        return <span key={generateKey(data.genre)}>{data.genre}</span>
                                                    })
                                                    : ''
                                            } |
                                        </li>
                                        <li className="slider-item-duration">{convertDuration(stream.duration)}</li>
                                    </ul>
                                    <p className="slider-item-maker">Filmmaker : <span>{name ? name.join(", ").trim() : "NA"}</span></p>
                                    <p className="slider-item-short-desc">{stream.short_description}</p>
                                    <Col>
                                        {
                                            isLoggedIn
                                                ? <Link to={'/' + makeUrlSlug(stream.title) + '/player/' + id}>
                                                    <Button className='default-btn'><FaPlay /> Watch Now</Button>
                                                </Link>
                                                : <Button className='default-btn' onClick={() => setShowPopup(!showPopup)}><FaPlay /> Watch Now</Button>
                                        }
                                        {
                                            (stream.type === 'M')
                                                ? isLoggedIn
                                                    ? <Link className='favoriteLink' to="#" ><FaHeart className={fav ? 'my-fav-icon' : 'fav-icon'} onClick={() => addRemoveFavorite()} /></Link>
                                                    : <Link className='favoriteLink' to="#" onClick={() => setShowPopup(!showPopup)}><FaHeart className='fav-icon' /></Link>
                                                : isLoggedIn
                                                    ? <Button className='btn default-btn whiteBtn' onClick={() => voteFestivals()} >{vote ? 'Voted' : 'Vote'}</Button>
                                                    : <Button className='btn default-btn whiteBtn' onClick={() => setShowPopup(!showPopup)}>Vote</Button>
                                        }
                                    </Col>
                                </div>
                            </Box>
                            <div className='bottomShaddow'></div>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Container fluid className='detail-related-slider mb-4'>
                {/* <Row>
                    <Col><h4>You Might Like</h4></Col>
                </Row> */}
                <Row className="justify-content-md-center">
                    <div className="slider_title_box"><div className="list_heading"><h3>You Might Like</h3></div></div>

                    <Carousel className='mainmultisliders' responsive={responsive}>
                        {
                            (relatedData.length > 0)
                                ? relatedData.map((item) => { return (<Item key={item['_id']} data={item} setLoader={setLoader} loader={loader} refreshPage={refreshPage} />) })
                                : <div style={{ color: '#FFFFFF', paddingLeft: '12px', fontSize: '1rem' }}>No related data found</div>
                        }
                    </Carousel>
                </Row>
                <Row className='deatil-bottom-divider mb-4'></Row>
                <Row className='mt-5 profile-image-box'>
                    <Col xs={12} md={12}>
                        <Image className='profile-image-icon' src={mainFilmMaker[0]["image"]} onError={imageOnErrorHandler} alt={mainFilmMaker[0]["name"] ? mainFilmMaker[0]["name"] : 'N/A'} roundedCircle />
                        <span>{mainFilmMaker[0]["name"] ? mainFilmMaker[0]["name"] : 'N/A'}</span>
                    </Col>
                </Row>
                <Row className='detail-bottom-desc mt-2'>
                    <ListGroup>
                        <ListGroup.Item>Filmmaker:&nbsp;
                            {
                                stream.filmmaker.length > 0
                                    ? stream.filmmaker.map((maker: any, i: number) => {
                                        return <Link to={maker.social_link ? maker.social_link : '#'} target={maker.social_link ? '_blank' : '_self'} className={maker.social_link ? 'social-link' : 'social-link-invalid'} key={generateKey(maker.name)}> {(stream.filmmaker.length > 1 && i != (stream.filmmaker.length - 1)) ? maker.name + ', ' : maker.name}</Link>
                                    })
                                    : 'N/A'
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>Directed By:&nbsp;
                            {
                                stream.director.length > 0
                                    ? stream.director.map((direct: any, i: number) => {
                                        return <Link to={direct.social_link ? direct.social_link : '#'} target={direct.social_link ? '_blank' : '_self'} className={direct.social_link ? 'social-link' : 'social-link-invalid'} key={generateKey(direct.director_name)}> {(stream.director.length > 1 && i != (stream.director.length - 1)) ? direct.director_name + ', ' : direct.director_name}</Link>
                                    })
                                    : 'N/A'
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>Produced By:&nbsp;
                            {
                                stream.producer.length > 0
                                    ? stream.producer.map((produce: any, i: number) => {
                                        return <Link to={produce.social_link ? produce.social_link : '#'} target={produce.social_link ? '_blank' : '_self'} className={produce.social_link ? 'social-link' : 'social-link-invalid'} key={generateKey(produce.producer_name)}>{(stream.producer.length > 1 && i != (stream.producer.length - 1)) ? produce.producer_name + ', ' : produce.producer_name}</Link>
                                    })
                                    : 'N/A'
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>Cast:&nbsp;
                            {
                                stream.filmmaker.length > 0
                                    ? stream.actor.map((actors: any, i: number) => {
                                        return <Link to={actors.social_link ? actors.social_link : '#'} target={actors.social_link ? '_blank' : '_self'} className={actors.social_link ? 'social-link' : 'social-link-invalid'} key={generateKey(actors.actor_name)}>{(stream.actor.length > 1 && i != (stream.actor.length - 1)) ? actors.actor_name + ', ' : actors.actor_name}</Link>
                                    })
                                    : 'N/A'
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Row>
                <Row className='mb-3 mt-3'>
                    <p className='item-detail-bottom-description'>
                        {stream.long_description}
                    </p>
                </Row>
            </Container>
            {showPopup && <MessagePopup show={showPopup} setShowPopup={setShowPopup} />}
        </>
    )
}

export default Detail