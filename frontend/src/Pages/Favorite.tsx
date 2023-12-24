import React, { useState, useEffect } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap';
import Item from '../components/Item';
import axios from 'axios';
import configData from '../config/Config';
import useCustomScroll from '../hooks/Scroll';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { Navigate } from 'react-router-dom';

const favoriteUrl: string = configData.API_URL + "/favorite/";

const Favorite = () => {
    useCustomScroll();
    const { loading, user, error, message, isLoggedIn } = useAppSelector(state => state.user) || [];
    const [favorite, setFavorite] = useState([]);
    const [loader, setLoader] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    console.log(user);
    useEffect(() => {

        const getFavoriteData = async () => {
            await axios.get(favoriteUrl + user['_id'])
                .then(res => {
                    // console.log(res);
                    if (res.data.data.length > 0) setFavorite(res.data.data);
                    setLoader(!loader);
                })
                .catch(error => {
                    console.log(error);
                    setLoader(!loader);
                    setErrorMessage(error.message);
                });
        };

        getFavoriteData();

    }, []);

    if (!isLoggedIn) return <Navigate to="/" />;

    const refreshPage = () => {
        return;
    }


    return loader ? <div style={{ textAlign: "center", color: "#FFFFFF", width: '100%', height: '100vh', display: 'grid', placeItems: 'center' }}><Spinner></Spinner></div> : (
        <>
            <Container fluid className='favorite-list-container'>
                <Row className='favorite-heading p-3'>
                    {
                        (favorite.length > 0)
                            ? <h3>Favorite</h3>
                            : ''
                    }
                </Row>
                <Row>
                    <ul>
                        {
                            errorMessage
                                ? <div style={{ textAlign: "center", color: "#FFFFFF", width: '100%', height: '80vh', display: 'grid', placeItems: 'center' }}><span>Opps! Something went wrong. Please check after sometime.</span></div>
                                : (favorite.length > 0)
                                    ? favorite.map((item) => {
                                        return (<li className='favorite-list-item' key={item['_id'] + new Date().getTime()}>(<Item key={item['_id']} data={item} setLoader={setLoader} loader={loader} refreshPage={refreshPage} />)</li>)
                                    })
                                    : <div className='favorite-heading text-center'><h3>No Data Found</h3></div>
                        }
                    </ul>
                </Row>
            </Container>
        </>
    )
}

export default Favorite;