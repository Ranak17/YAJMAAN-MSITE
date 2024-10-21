import axios from 'axios';
import { OrderReq, PaymentResp } from '../models/payment';
import agent from '../api/agent';
import { store } from '../stores/store';
import React from 'react';
import { User } from '../models/user';

export const handlePayment = async (req: OrderReq, user: User): Promise<PaymentResp> => {
    let resp: PaymentResp = {
        amount: '',
        orderID: '',
        status: false,
        transactionID: '',
    };

    const { userStore } = store; // You might not need this, depending on your context
    console.log("Payment request : ", req);
    try {
        // Step 1: Create an order on the server
        const data = await agent.Transaction.createUPIOrder(req);
        const order_id = data.id;
        resp.orderID = order_id;
        resp.amount = (data.amount / 100)?.toString();

        // Step 2: Initiate Razorpay Checkout
        const options = {
            key: `${user.phoneNumber}` === "1111111111" ? 'rzp_test_kSj5tst4pJx6UE' : 'rzp_live_JJ5eLIfsXfvh37',
            amount: data.amount,
            currency: 'INR',
            name: `${user.displayName}`,
            description: 'Dakshana Payment',
            image: 'https://example.com/your_logo',
            order_id: order_id,
            prefill: {
                name: `${user.displayName}`,
                email: `${user.email}`,
                contact: `${user.phoneNumber}`,
            },
            theme: { color: 'red' },
        };

        const rzp = new window.Razorpay(options);

        rzp.open();

        rzp.on('payment.failed', function (response) {
            console.log('Payment Failed', response.error);
            // Handle failure (e.g., show a message to the user)
        });

        rzp.on('payment.authorized', async (data) => {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = data;
            resp.transactionID = razorpay_payment_id;
            resp.status = await verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
        });

    } catch (error) {
        console.error('Error:', error);
    }
    return resp;
};

const verifyPayment = async (order_id: string, payment_id: string, signature: string): Promise<boolean> => {
    try {
        const response = await agent.Transaction.verifyPayment({
            razorpay_order_id: order_id,
            razorpay_payment_id: payment_id,
            razorpay_signature: signature,
        });
        return response.message === 'Payment verified successfully';
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};
