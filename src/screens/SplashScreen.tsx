import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/globalstyle.css'
export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        // Set a timeout to navigate to the login screen after 3 seconds
        const timer = setTimeout(() => {
            navigate('/Darshan'); // Navigate to SignIn screen
        }, 3000);

        // Clear the timer if the component is unmounted to prevent memory leaks
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-container">
            <h1 className='gradient-text'>Yajmaan</h1>
            <h3>India’s Daily Darshan Platform</h3>
        </div>
    );
}
