import React from 'react';
// import './AboutTemple.css'; // Import the CSS file for styling
import { DarshanVideo } from '../models/darshan';
import { IoClose } from "react-icons/io5";
import '../styles/aboutTempleStyle.css'
interface AboutTempleProps {
    templeData: DarshanVideo;
    hideModal: () => void;
    handleButtonClick: (buttonType: string) => void;
}

const AboutTemple: React.FC<AboutTempleProps> = ({ templeData, hideModal }) => {
    const content = [
        {
            headingText: 'Temple Name',
            description: templeData?.aboutTemple?.name || "N/A"
        },
        {
            headingText: 'Location',
            description: `${templeData?.aboutTemple?.location?.street || "N/A"} ${templeData?.aboutTemple?.location?.state || "N/A"}`
        },
        {
            headingText: 'Description',
            description: templeData?.aboutTemple?.description || "N/A"
        }
    ];

    return (
        <div className="container">
            <div className="dfac">
                <span>About Temple</span>
                <div style={{ position: 'absolute', right: 20 }}>
                    <IoClose onClick={hideModal} style={{ color: 'white', fontSize: '1.2rem', cursor: 'pointer' }} />
                </div>
            </div>
            <div className="content-scroll">
                {content.map((item, index) => (
                    <div className="section" key={index}>
                        <div className="heading-text">{item.headingText}</div>
                        <div className="paragraph-text">{item.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutTemple;
