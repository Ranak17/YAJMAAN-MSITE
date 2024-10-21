import React from "react";
import { useNavigate } from 'react-router-dom';  // Hook for navigation
import '../styles/DakshanaStyle.css';  // Assuming you're using CSS for styling instead of React Native's StyleSheet

import { store } from '../stores/store';
import { ButtonType } from "../../screens/Darshan";
import { handlePayment } from '../utils/RazorPayTransactions';
import { IoClose } from "react-icons/io5";

const Dakshana = ({ hideModal, handleButtonClick, templeData }) => {
    const navigate = useNavigate();  // Use hook to access navigation
    const dakshanaList = [
        { price: 101 },
        { price: 201 },
        { price: 501 }
    ];

    const { userStore } = store;

    const handlePay = async (price) => {
        let req = {
            amount: parseFloat(price), // Example amount in INR
            receipt: 'abc',
            item: 'Dakshana',
            itemContents: 'Dakshana',
            templeId: templeData.templeId,
            toAddressId: 17,
            userId: userStore.user.userId,
            phoneNumber: userStore.user.phoneNumber
        };

        let paymentResp = await handlePayment(req, navigate, userStore.user);
        hideModal();
        navigate('/darshan');
    };

    return (
        <div className="dakshana-container">
            <div>
                <div className="dfac">
                    <div className="icon dfjcac">
                        <img src="./images/dakshana2.png" alt="Dakshana Icon" className="icon-image" />
                    </div>
                    <span className="header-text">Dakshana</span>
                    <IoClose onClick={hideModal} style={{
                        color: 'white',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        position: 'absolute',
                        right: '1rem'
                    }} />
                </div>

            </div>
            <p className="description">
                Offer Dakshina and get holy blessings from <span className="highlight-text">{templeData?.aboutTemple?.name}</span> Temple
            </p>
            <div className="price-list">
                {dakshanaList.map((item, index) => (
                    <div className="price-list-item" key={index}>
                        <button className="price-button" onClick={() => handlePay(item.price)}>
                            ₹{item.price}
                        </button>
                    </div>
                ))}
            </div>
            <img src="./images/partner-certificate.png" alt="Partner Certificate" className="certificate-image" />
            <p className="partner-text">
                Official Partner of <span className="highlight-text">{templeData?.aboutTemple?.name}</span>
            </p>
        </div>
    );
};

export default Dakshana;
