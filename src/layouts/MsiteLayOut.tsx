import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/globalstyle.css';

export default function MsiteLayOut() {
    return (
        <div className="msite-container">
            <div className="screen-container">
                {/* The Outlet will render the components for different routes */}
                <Outlet />
            </div>
            <div className="image-container">
                {/* Fixed content on the right */}
            </div>

        </div>
    );
}
