import { useEffect, useRef, useState } from 'react';
import '../styles/globalstyle.css';
import { IoPlayCircleOutline } from 'react-icons/io5';

function VideoPlayer({ videoUrl, mute }) {
    const videoRef = useRef(null);
    const [play, setPlay] = useState<boolean>(true);
    const togglePlay = () => {
        setPlay(!play);
    };
    useEffect(() => {
        if (videoRef.current) {
            // Play or pause based on the 'play' prop
            if (play) {
                videoRef.current.play().catch((error) => {
                    if (error.name !== 'AbortError') {
                        console.error("Failed to play video:", error);
                    }
                });
            } else {
                videoRef.current.pause();
            }
        }
    }, [play]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (videoRef.current) {
                        if (entry.isIntersecting) {
                            // Try to play the video, catching potential AbortError
                            videoRef.current.play().catch((error) => {
                                if (error.name !== 'AbortError') {
                                    console.error("Failed to play video:", error);
                                }
                            });
                        } else {
                            videoRef.current.pause();
                        }
                    }
                });
            },
            { threshold: 0.7 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <div className="video-container" onClick={togglePlay}>
            <video
                ref={videoRef}
                src={videoUrl}
                controls={false}
                muted={mute}
                loop
                className="reel-video"
                style={{ width: '100%', height: '100%' }}
            />
            <div id='play-video-icon'>
                {!play
                    ? <IoPlayCircleOutline />
                    : ''
                }

            </div>
        </div>
    );
}

export default VideoPlayer;
