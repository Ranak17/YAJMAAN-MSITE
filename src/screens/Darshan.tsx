import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Stories from '../components/Stories';
import VideoPlayer from '../utils/VideoPlayer'; // Import the VideoPlayer component
import '../styles/darshanStyle.css';
import { RiWhatsappFill } from "react-icons/ri";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Menu from './Menu';
import AboutTemple from './AboutTemple';
import Dakshana from './Dakshana';

export enum ButtonType {
    Prashad = 'Prashad',
    AboutTemple = 'AboutTemple',
    Dakshana = 'Dakshana',
    Menu = 'Menu',
}

export default function Darshan() {
    const [videos, setVideos] = useState([]);
    const [selectedButton, setSelectedButton] = useState<ButtonType | null>(null);
    const [modalData, setModalData] = useState<any>(null); // Update type based on modalData structure
    const [isLogOutClicked, setIsLogOutClicked] = useState<boolean>(false);
    const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(true);
    const [currentAudio, setCurrentAudio] = useState(null); // Track the current audio
    const [isPlaying, setIsPlaying] = useState(false); // Track if the audio is playing
    const bellAudioRef = useRef(new Audio('./audios/temple_bell.mp3')); // Reference for bell audio
    const shankhAudioRef = useRef(new Audio('./audios/shankh-sound.mp3')); // Reference for shankh audio

    // Function to toggle audio
    const handleAudioClick = (audioRef, audioType) => {
        // If the same audio is clicked, toggle play/pause
        if (currentAudio === audioType) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            // Stop the previous audio if another audio is clicked
            if (currentAudio === 'bell') {
                bellAudioRef.current.pause();
                bellAudioRef.current.currentTime = 0; // Reset the audio to the start
            } else if (currentAudio === 'shankh') {
                shankhAudioRef.current.pause();
                shankhAudioRef.current.currentTime = 0;
            }

            // Play the new audio
            audioRef.current.play();
            setCurrentAudio(audioType);
            setIsPlaying(true);
        }
    };
    const hideModal = () => {
        setSelectedButton(null);
    };

    const handleButtonClick = (button: ButtonType) => {
        setSelectedButton(button);
    };
    const [selectedStory, setSelectedStory] = useState('all'); // Default to 'all'

    // Function to fetch videos based on the selected story
    const fetchVideos = async (filter) => {
        console.log("fetching stories with filter : ", filter);
        try {
            const response = await fetch('http://13.53.229.65:3000/api/darshan/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    filter,   // Use the filter provided
                    limit: 5,
                    offset: 1
                })
            });
            console.log("request body : ", JSON.stringify({
                filter,   // Use the filter provided
                limit: 5,
                offset: 1
            }))
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setVideos(data);
            console.log("videos : ", data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    // useEffect to fetch videos on initial render and when selectedStory changes
    useEffect(() => {
        console.log("selectedStory : ", selectedStory);
        fetchVideos(selectedStory); // Fetch videos based on selected story
    }, [selectedStory]);
    // Update this function to set the selected story and trigger video fetching
    const handleStoryChange = (filter) => {
        setSelectedStory(filter);
    };
    console.log("selectedButton : ", selectedButton);
    return (
        <div style={{ backgroundColor: '#261602' }}>
            <Header setSelectedButton={setSelectedButton} />
            <Stories onStoryChange={handleStoryChange} /> {/* Pass function to Stories */}
            <div className="modal-wrapper">

                <div className="video-list">
                    {videos.map((video) => (
                        <div key={video.videoId} className="video-item">
                            <VideoPlayer videoUrl={video.videoUrl} />
                            <div className="video-info">
                                <div className="video-info-1">
                                    <div>
                                        <span className="temple-name">{video.aboutTemple.name}</span>&nbsp;
                                        <span className="filter-tag">{video.filter}</span>
                                    </div>
                                    <div className="darshan-icon">
                                        <IoMdInformationCircleOutline
                                            color="white"
                                            onClick={() => {
                                                setModalData(video);
                                                setSelectedButton(ButtonType.AboutTemple);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        /> &nbsp;
                                        <RiWhatsappFill color="green" style={{ cursor: 'pointer' }} />
                                        &nbsp;&nbsp;
                                    </div>
                                </div>
                                <div className="video-info-2">
                                    undefined | {video.aboutTemple.location.state} | {video.videoViewCount}
                                </div>
                            </div>
                            <div className="right-icons">
                                <div className="right-icon">
                                    <img
                                        src="./images/bell.png"
                                        alt="bell"
                                        onClick={() => handleAudioClick(bellAudioRef, 'bell')}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <div className="right-icon">
                                    <img src="./images/flower.png" alt="flower" />
                                </div>
                                <div className="right-icon">
                                    <img
                                        src="./images/shankh.png"
                                        alt="shankh"
                                        onClick={() => handleAudioClick(shankhAudioRef, 'shankh')}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <div className="right-icon" onClick={() => {
                                    setSelectedButton(ButtonType.Dakshana);
                                    setModalData(video);
                                }}>
                                    <img src="./images/dakshana.png" alt="dakshana" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`modal ${selectedButton != null && selectedButton === ButtonType.Menu ? 'show' : 'hide'}`}>
                    <Menu
                        hideModal={hideModal}
                        showModal={() => setSelectedButton(ButtonType.Menu)}
                        handleButtonClick={handleButtonClick}
                        setIsLogOutClicked={setIsLogOutClicked}
                    />
                </div>
                <div className={`modal ${selectedButton != null && selectedButton === ButtonType.Dakshana ? 'show' : 'hide'}`}>
                    <Dakshana
                        hideModal={hideModal}
                        templeData={modalData}
                        handleButtonClick={handleButtonClick}
                    />
                </div>
                <div className={`modal ${selectedButton != null && selectedButton === ButtonType.AboutTemple ? 'show' : 'hide'}`}>
                    <AboutTemple
                        hideModal={hideModal}
                        templeData={modalData}
                        handleButtonClick={handleButtonClick}
                    />
                </div>
            </div>
        </div>
    );
}
