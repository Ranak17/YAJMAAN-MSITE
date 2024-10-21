import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation in React.js
import InputFields from "../components/InputFields";
import globalStyles from "../styles/globalstyle.css";
import { store } from "../stores/store";
import { useAuth } from "../utils/AuthProvider";
import LogOut from "../components/ModalView/LogOut";
import { RiDeleteBin6Line } from "react-icons/ri";
import '../styles/ProfileStyle.css'; // Importing the CSS file

const Profile = () => {
    const navigate = useNavigate(); // React router's useNavigate hook
    const { userStore } = store;
    const [user, setUser] = useState(userStore.user);
    const { setIsLoggedInUser, setIsLogOutClicked } = useAuth();

    const updateUserProfile = (fieldName, value) => {
        setUser(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    return (
        <div className="profile-background">
            <div className="profile-container">
                <div className="profile-scroll">
                    <p className="profile-info-text">
                        We will protect your info and will not share it with any 3rd party!
                    </p>
                    <InputFields fieldName='name' inputTitle='Name' updateField={updateUserProfile} value={user.name} />
                    <InputFields
                        fieldName='phoneNumber'
                        inputTitle='Mobile Number'
                        updateField={updateUserProfile}
                        value={user.phoneNumber?.toString()}
                        isEditable={false}
                    />
                    <button
                        className="delete-account-btn"
                        onClick={async () => {
                            await userStore.deleteAccount();
                            setIsLoggedInUser(false);
                            navigate('/Darshan');
                        }}
                    >
                        <RiDeleteBin6Line />
                        <span> Delete Account</span>
                    </button>
                </div>

                <button
                    className="custom-button"
                    onClick={() => userStore.saveUserProfile(user)}
                >
                    Save Changes
                </button>
                <button
                    className="custom-button"
                    style={{ border: '1px solid #FF4500', backgroundColor: 'transparent' }}
                    onClick={() => {
                        userStore.logout();
                        navigate('/Darshan');
                        setIsLoggedInUser(false);
                        setIsLogOutClicked(true);
                    }}
                >
                    Logout
                </button>
            </div>
        </div >
    );
};

export default Profile;
