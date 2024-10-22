import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation in React.js
import InputFields from "../components/InputFields";
import { store } from "../stores/store";
import { useAuth } from "../utils/AuthProvider";
import { RiDeleteBin6Line } from "react-icons/ri";
import '../styles/ProfileStyle.css'; // Importing the CSS file
import { buttonStore, ButtonType } from "../stores/ButtonStore";

import { IoClose } from "react-icons/io5";
import { observer } from "mobx-react-lite";

const Profile = observer(() => {
    console.log("buttonStore.selectedButton : ", buttonStore.selectedButton)
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
        <div className="modal-wrapper" style={{ height: '100vh' }}>
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
                            onClick={() => buttonStore.setSelectedButton(ButtonType.DeleteAccount)}
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
                            console.log("button cliecked");
                            buttonStore.setSelectedButton(ButtonType.LogOut);
                            console.log("buttonStore.selectedButton:", buttonStore.selectedButton)
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className={`modal ${buttonStore.selectedButton != null && buttonStore.selectedButton === ButtonType.LogOut ? 'show' : 'hide'}`}>
                <div className="logout-popup-header dfjcsb">
                    <span>Are you sure you want to logout?</span>
                    <IoClose onClick={() => buttonStore.setSelectedButton(null)} cursor={'pointer'} />
                </div>
                <div className="logout-text">
                    Don’t worry, you can always Login by entering your mobile number.
                </div>
                <div>
                    <button className="custom-button" onClick={async () => {
                        await userStore.logout();
                        setIsLoggedInUser(false);
                    }}>Yes, Logout Now</button>

                </div>
            </div>

            <div className={`modal ${buttonStore.selectedButton != null && buttonStore.selectedButton === ButtonType.DeleteAccount ? 'show' : 'hide'}`}>
                <div className="logout-popup-header dfjcsb">
                    <span>Are you sure you want to Delete the Account?</span>
                    <IoClose onClick={() => buttonStore.setSelectedButton(null)} cursor={'pointer'} />
                </div>
                {/* <div className="logout-text">
                    Don’t worry, you can always Login by entering your mobile number.
                </div> */}
                <div>
                    <button className="custom-button" onClick={async () => {
                        await userStore.deleteAccount();
                        setIsLoggedInUser(false);
                        navigate('/Darshan');
                    }}>Yes, Delete Account</button>

                </div>
            </div>
        </div >
    );
}
)
export default Profile;
