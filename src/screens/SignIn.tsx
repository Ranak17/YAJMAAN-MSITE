import React, { useState } from 'react';
import '../styles/signinStyle.css'; // Assuming you will have a separate CSS file for styles
import '../styles/globalstyle.css'
import { useAuth } from '../utils/AuthProvider';
import { store } from '../stores/store';
import { useNavigate } from 'react-router-dom';
import rangoliBackground from '../assets/images/rangoli-background.png'
export default function SignIn() {
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigation = useNavigate(); // Updated here
    const { userStore } = store;

    const handleChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        userStore.loginSendOTP(phoneNumber, navigation);
        navigation('/OTPVerification', { state: { phoneNumber } }); // Updated navigation
    };

    return (
        <div className="signin-container" style={{ backgroundImage: `url(${rangoliBackground})` }}>
            <div className='signIn-text'>Enter your mobile number to get started</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="mobile-number"
                    value={phoneNumber}
                    onChange={handleChange}
                    placeholder="Mobile number"
                    maxLength={10}

                />
                <button type="submit" className="custom-button">Continue</button>
            </form>
        </div>
    );
}
