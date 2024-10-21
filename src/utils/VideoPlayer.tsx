import React, { useEffect, useState, useRef } from 'react';
import '../styles/globalstyle.css'
// Video Player component to handle autoplay and video rendering
function VideoPlayer({ videoUrl }) {
    const videoRef = useRef(null);

    useEffect(() => {
        // IntersectionObserver to play/pause video based on visibility
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoRef.current.play();
                    } else {
                        videoRef.current.pause();
                    }
                });
            },
            { threshold: 0.7 } // Play video when 70% of the video is in view
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
        <div className="video-container">
            <video
                ref={videoRef}
                src={videoUrl}
                controls={false}
                muted
                loop
                className="reel-video"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}

export default VideoPlayer;
