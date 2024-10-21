import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/globalstyle.css'; // Just import without assigning to a variable
import { IoClose } from "react-icons/io5";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiWhatsappFill } from "react-icons/ri";

const Menu = ({ hideModal }) => {
    const navigate = useNavigate();

    const handleWhatsAppClick = () => {
        let phoneNumber = "+919886257528"; // Ensure the number is in international format
        let message = "Hello!"; // Default message
        let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(url, '_blank'); // Opens in a new tab
    };

    const menuItems = [
        { text: 'Profile', image: '../images/profile.png', navigation: '/profile' },
        { text: 'Orders', image: '../images/box.png', navigation: '/orders' },
        { text: 'Addresses', image: '../images/address.png', navigation: '/address' },
        { text: 'Legal', image: '../images/legalterm-icon.png', navigation: '/legal' },
        { text: 'Term & Conditions', image: '../images/legalterm-icon.png', navigation: '/TermAndConditions' }
    ];

    return (
        <div className="container">
            <div className="header dfac">
                <span>Menu</span>
                <div style={{ position: 'absolute', right: 20 }}>
                    <IoClose onClick={hideModal} style={{ color: 'white', fontSize: '1.2rem', cursor: 'pointer' }} />
                </div>
            </div>

            <div style={{ height: '60%' }}>
                <div className="scroll-view">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className="menu-item"
                            onClick={() => { navigate(item.navigation); hideModal(); }}
                        >
                            <img
                                src={item.image}
                                alt={item.text}
                                style={{ height: '20px', width: '20px', marginRight: '10px' }}
                            />
                            <span className="menu-text">{item.text}</span>
                            <RiArrowRightSLine
                                style={{ position: 'absolute', right: '20px', cursor: 'pointer' }}
                                onClick={hideModal}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button className="custom-button" onClick={handleWhatsAppClick}>
                <RiWhatsappFill style={{ marginRight: '10px' }} />
                Connect via WhatsApp
            </button>
        </div>
    );
};

export default Menu;
