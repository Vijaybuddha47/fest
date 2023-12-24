import React, { useEffect, useState } from 'react'
import videojs from 'video.js';
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import 'video.js/dist/video-js.css';
import { FaArrowLeft } from 'react-icons/fa';
import configData from "../config/Config";
import axios from "axios";
import { useAppSelector } from '../redux/hooks';
import useLoggedIn from '../hooks/LoggedIn';

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
    _id: string,
}

const detailUrl: string = configData.API_URL + "/item-detail";
const MainPlayer = () => {
    useLoggedIn();
    const { loading, user, error, message, isLoggedIn } = useAppSelector(state => state.user) || [];
    const navigate = useNavigate();
    const { id } = useParams();
    // const [playerLoading, setPlayeLoading] = useState(true);
    const videoRef: any = React.useRef(null);
    const playerRef: any = React.useRef(null);
    const [source, setSource] = useState({ src: '', type: '' });
    const [options, setOptions] = useState({
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: "",
            type: 'video/mp4'
        }]
    });

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
        _id: '',
    });
    const [loader, setLoader] = useState(true);

    console.log(id);

    const videoJsOptions = {
        muted: true,
        preload: true,
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        controlBar: { skipButtons: { forward: 5, backward: 5 } },
        sources: [{
            src: '',
            type: ''
        }]
    };

    const handlePlayerReady = (player: any) => {
        playerRef.current = player;

        console.log(stream.title);

        // You can handle player events here, for example:
        player.on('canplay', () => {
            videojs.log('player is canplay');
        });
        player.on('loadedmetadata', () => {
            videojs.log('loadedmetadata');
        });

        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('playing', () => {
            videojs.log('player is playing');
        });

        player.on('play', () => {
            videojs.log('play');
        });

        player.on('timeupdate', (e: object) => {
            videojs.log('timeupdate');
            appendMovieTitle()
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });

        player.on('error', (e: object) => {
            videojs.log('player error', e);
        });
    };

    useEffect(() => {
        console.log("first useEffect called");
        const getDetailData = async () => {
            const param = {
                item_id: id,
                ...(isLoggedIn && { user_id: user['_id'] })
            }
            // console.log(param);
            await axios.post(detailUrl, param)
                .then(res => {
                    console.log(res);
                    setStream(res.data.detail)
                    setLoader(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoader(false);
                });
        }
        getDetailData();
    }, []);

    useEffect(() => {
        console.log("second  useeffect called ", stream.stream_file);
        setSource({ src: stream.stream_file, type: stream.stream_file.indexOf('.m3u8') > -1 ? 'video/m3u8' : 'video/mp4' });

        console.log(source);

        // Make sure Video.js player is only initialized once
        if (!playerRef.current && stream.stream_file != '') {
            console.log("111111111");
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
            const videoElement = document.createElement("video-js");
            videoElement.classList.add('vjs-big-play-centered');
            // if (videoRef.current !== null) {
            //     videoRef.current.focus();
            // } else videoRef.current.appendChild(videoElement);
            videoRef.current.appendChild(videoElement);

            videoJsOptions.sources = [{ src: stream.stream_file, type: stream.stream_file.indexOf('.m3u8') > -1 ? 'video/m3u8' : 'video/mp4' }];

            const player = playerRef.current = videojs(videoElement, videoJsOptions, () => {
                videojs.log('player is ready');
                handlePlayerReady && handlePlayerReady(player);
            });

            player.play();

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else if (playerRef.current && stream.stream_file) {
            console.log("2222222222");
            const player: any = playerRef.current;
            player.autoplay(true);
            player.src([{ src: source.src, type: source.type }]);
            player.play();
        }
    }, [stream]);

    // Dispose the Video.js player when the functional component unmounts
    useEffect(() => {
        console.log("third useEffect called");
        const player = playerRef.current;
        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);


    const appendMovieTitle = () => {
        if (!document.querySelector('#movieTitle')) {
            const div: any = document.querySelector('.video-js-player div');
            // console.log(div);
            const x = document.createElement("DIV");
            x.setAttribute("id", "movieTitle");
            x.setAttribute("class", "player-movie-title");
            const t = document.createTextNode(stream.title);
            x?.appendChild(t);
            div?.appendChild(x);
        }

        console.log("title", stream.title);

        const movieTitle: any = document.querySelector('#movieTitle');
        movieTitle.innerHTML = stream.title;

        const controlBar: any = document.querySelector('.vjs-control-bar');
        const backBtn: any = document.querySelector('#playerBackBtn');
        if (window.getComputedStyle(controlBar).opacity == '0') {
            backBtn.setAttribute('style', "opacity: 0;")
            movieTitle.setAttribute('style', "opacity: 0;");
        } else {
            backBtn.setAttribute('style', "opacity: 1;");
            movieTitle.setAttribute('style', "opacity: 1;");
        }
    }

    return false
        ? <div style={{ textAlign: "center", color: "#FFFFFF", width: '100%', height: '100vh', display: 'grid', placeItems: 'center' }}><Spinner></Spinner></div>
        : (
            <div className='player-container'>
                <span onClick={() => navigate(-1)} id='playerBackBtn'><FaArrowLeft className='player-back-arrow' /></span>
                <div className='video-js-player' vjs-fluid data-vjs-player>
                    <div ref={videoRef} />
                </div>
            </div>
        );

}

export default MainPlayer;

