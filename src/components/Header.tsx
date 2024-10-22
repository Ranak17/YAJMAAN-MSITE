
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/globalstyle.css';
import { useAuth } from '../utils/AuthProvider';
import { ButtonType, buttonStore } from "../stores/ButtonStore";

export default function Header() {
    const navigate = useNavigate(); // Initialize the navigation hook
    const { isLoggedInUser } = useAuth();
    const handleMenuClick = () => {
        console.log("buttonStore.selectedButton : ", buttonStore.selectedButton)
        buttonStore.setSelectedButton(ButtonType.Menu);
        if (!isLoggedInUser) {
            console.log("isLoggedInUser : ", isLoggedInUser);
            navigate('/signin'); // Navigate to the SignIn screen
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
