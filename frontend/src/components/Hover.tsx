import React, { useEffect, useRef } from 'react'
import { Spinner } from 'react-bootstrap';
import HoverVideoPlayer from 'react-hover-video-player';

interface videoProps {
    url: string;
    poster: string;
    isVideoPlaying: boolean;
    id: string;
}

const Hover = (props: videoProps) => {
    const hoverVideoRef = useRef();

    useEffect(() => {
        const videoElement = hoverVideoRef.current;

        // videoElement.playbackRate = 2;
    }, []);

    return (
        <HoverVideoPlayer
        className='thumbnailPlayer'
            videoSrc={props.url}
            volume={0.5}
            muted={false}
            preload="none"
            // focused={props.isVideoPlaying}
            onBlur={() => {
                console.log('on blur');
            }}
            hoverTarget={() => document.getElementById(props.id)}
            // loop={false}
            // preload="metadata"
            unloadVideoOnPaused
            // playbackStartDelay={100}
            // disableRemotePlayback={false}
            // disablePictureInPicture={false}
            // crossOrigin="anonymous"
            overlayTransitionDuration={500}
            loadingStateTimeout={1000}

            onHoverEnd={() => {
                console.log('User just moused out of or touched outside of hover target.');
                console.log('The video will now stop playing.');
            }}

            // videoRef={hoverVideoRef}
            // We should display an image over the video while it is paused
            pausedOverlay={
                <img
                    src={props.poster}
                    alt="test"
                    style={{
                        // Make the image expand to cover the video's dimensions
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            }
            loadingOverlay={
                <Spinner animation="border" variant="light" size="sm"></Spinner>
            }
        />
    )
}

export default Hover