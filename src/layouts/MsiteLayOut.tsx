
import { Outlet } from 'react-router-dom';
import '../styles/globalstyle.css';
import rangoliBackground from '../assets/images/rangoli-background.png'; // Importing the image
import bannerImage from '../assets/images/banner.jpg'; // Importing the image

export default function MsiteLayOut() {
    return (
        <div className="msite-container">
            <div className="screen-container" style={{ backgroundImage: `url(${rangoliBackground})` }}>
                {/* The Outlet will render the components for different routes */}
                <Outlet />
            </div>
            <div className="image-container" style={{ backgroundImage: `url(${bannerImage})` }}>
                {/* Fixed content on the right */}
            </div>

        </div>
    );
}
