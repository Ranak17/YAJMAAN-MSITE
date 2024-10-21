import React from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/globalstyle.css';
import { useAuth } from '../utils/AuthProvider';
import { ButtonType } from '../screens/Darshan';

export default function Header({ setSelectedButton }) {
    const navigate = useNavigate(); // Initialize the navigation hook
    const { isLoggedInUser } = useAuth();
    const handleMenuClick = () => {
        setSelectedButton(ButtonType.Menu);
        if (isLoggedInUser) {
            // navigate()
            navigate('/Darshan'); // Navigate to the SignIn screen
        }
    };

    return (
        <div className='header'>
            <div className='gradient-text'>Yajmaan</div>
            <div>
                {/* <IoMdNotificationsOutline /> &nbsp; */}
                <CiMenuKebab onClick={handleMenuClick} style={{ cursor: 'pointer' }} /> {/* Attach onClick */}
            </div>
        </div>
    );
}
