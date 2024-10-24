import React, { useEffect, useState } from 'react';
import '../styles/otpVerificationStyle.css'; // Assume you create this CSS file for styles
import { useAuth } from '../utils/AuthProvider';
import { store } from '../stores/store';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OTPVerification() {
    const [otp, setOtp] = useState(new Array(6).fill('')); // Array to hold 6 digits of OTP
    const [timeLeft, setTimeLeft] = useState(30);
    const { userStore } = store;
    const [loading, setLoading] = useState<boolean>(false); // Added loading state
    const [isOTPCorrect, setIsOTPCorrect] = useState<boolean>(true);
    const { isLoggedInUser, setIsLoggedInUser } = useAuth();
    const location = useLocation();
    const { phoneNumber } = location.state || {}; // Extract phoneNumber from location.state
    const navigation = useNavigate();

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time; // Format time with leading zero if needed
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return; // Only allow numbers

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus on the next input field if current one is filled
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            if (e.target.previousSibling) {
                e.target.previousSibling.focus(); // Move to the previous input field
            }
        }
    };

    const verifyOTP = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join(''); // Combine OTP digits
        const postData = {
            phoneNumber: phoneNumber,
            otp: enteredOtp,
        };
        console.log('postData:', postData); // Handle OTP verification logic here

        if (enteredOtp.length === 6) {
            setLoading(true); // Start loading

            try {
                const data = await userStore.loginVerifyOTP(postData, navigation);
                if (data && data.is_verified) {
                    setIsOTPCorrect(true);
                    setIsLoggedInUser(true);
                    navigation('/Darshan', { state: { phoneNumber } });
                } else {
                    setIsOTPCorrect(false);
                }
            } catch (error) {
                console.error('Error during OTP verification:', error);
                setIsOTPCorrect(false);
            } finally {
                setLoading(false); // End loading after verification
            }
        } else {
            setIsOTPCorrect(false);
        }
    };

    return (
        <div className="otp-container">
            <div className="otp-heading">Enter OTP sent on</div>
            <div className="otp-number">{phoneNumber}</div>

            <form onSubmit={verifyOTP} className="otp-form">
                <div className="otp-inputs">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="tel" // Change from "text" to "tel"
                            maxLength="1"
                            className="otp-input"
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace
                            onFocus={(e) => e.target.select()}
                        />
                    ))}
                </div>
                <button type="submit" className="custom-button">Verify</button>
                <div style={{ margin: '1rem' }}>
                    {timeLeft > 0 ? (
                        <span>Didn't receive OTP? Wait for {formatTime(timeLeft)}s</span>
                    ) : (
                        <>
                            <span>Didn't receive OTP? </span>
                            <button
                                onClick={() => setTimeLeft(30)}
                                style={{ backgroundColor: 'transparent', border: 'none', color: '#FA4A29', cursor: 'pointer' }}
                            >
                                Resend OTP
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
