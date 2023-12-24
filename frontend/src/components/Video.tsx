import React, { useEffect, useRef } from 'react'
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const Video = (props: any) => {
    const videoRef: any = React.useRef(null);
    const playerRef: any = React.useRef(null);
    // const { options, onReady } = props;

    const videoJsOptions = {
        autoplay: true,
        controls: false,
        responsive: true,
        fluid: true,
        sources: [{
            src: props.url,
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player: any) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('playing', () => {
            videojs.log('player is playing');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });

        player.on('error', (e: object) => {
            videojs.log('player error', e);
        });
    };

    useEffect(() => {
        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            console.log("111111111");
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            // if (videoRef.current !== null) {
            //     videoRef.current.focus();
            // } else videoRef.current.appendChild(videoElement);
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, videoJsOptions, () => {
                videojs.log('player is ready');
                console.log(this);
                handlePlayerReady && handlePlayerReady(player);
            });

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            console.log("2222222222");
            const player: any = playerRef.current;
            player.autoplay(videoJsOptions.autoplay);
            player.src(videoJsOptions.sources);
        }
    }, [videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
}

