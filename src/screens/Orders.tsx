import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom"; // Use React Router for navigation
import { ImageBackground } from "react-native"; // You can replace this with a regular <div> and CSS for background image
// import { getOrdersFromLocalStorage, isOrdersTableEmpty, addOrderToLocalStorage } from '../utils/database';
// import LoadingScreen from "./LoadingScreen"; // Make sure this is compatible with React
import { store } from '../stores/store'; // Assuming your store is set up properly
import { RiArrowRightSLine } from "react-icons/ri";
import '../styles/ordersStyle.css'
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { userStore } = store;
    // const history = useHistory(); // Use for navigation
    // 
    // Function to check if the orders table is empty
    const checkOrders = async () => {
        // const isEmpty = await isOrdersTableEmpty(); // Check if the orders table is empty
        // if (isEmpty) {
        //     fetchOrdersFromAPI(); // Fetch from API if table is empty
        // } else {
        //     fetchOrdersFromAPI(); // Fetch from local storage if table is not empty
        // }
        fetchOrdersFromAPI();
    };

    // Fetch orders from local SQLite storage
    // const fetchLocalOrders = async () => {
    //     try {
    //         const localOrders = await getOrdersFromLocalStorage();
    //         if (localOrders) {
    //             const parsedOrders = localOrders.map(order => ({
    //                 ...order,
    //                 fromAddress: JSON.parse(order.fromAddress),
    //                 toAddress: JSON.parse(order.toAddress),
    //                 payment: JSON.parse(order.payment)
    //             }));
    //             setOrders(parsedOrders); // Use local data if available
    //         }
    //     } catch (error) {
    //         console.error("Error fetching local orders: ", error);
    //     }
    // };

    // Fetch orders from the API
    const fetchOrdersFromAPI = async () => {
        try {
            const fetchedOrders = await userStore.getOrders(userStore.user.userId);
            setOrders(fetchedOrders);
            // Save Orders to local storage (like SQLite)
            // for (let order of fetchedOrders) {
            //     await addOrderToLocalStorage(order);
            // }
        } catch (error) {
            console.error("Error fetching orders from API: ", error);
        }
    };

    useEffect(() => {
        checkOrders(); // Check if orders table is empty, then fetch accordingly
    }, []);

    // if (orders.length === 0) return <LoadingScreen />;

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: '#160c00',
                backgroundImage: `url('../../assets/images/rangoli-background.png')`,
                backgroundSize: 'cover',
                padding: '10px',
                color: 'white'
                // paddingTop: '70px' // Adjust as per your layout
            }}
        >
            <h2>Orders</h2>
            <div className="order-container">
                {orders.map((order, index) => (
                    <div style={styles.orderCard} key={index}>
                        <h2 style={{ color: '#FA4A29', fontSize: '17px', marginBottom: '10px' }}>
                            Order ID #{order.orderId}
                        </h2>
                        <div
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            onClick={() => history.push(`/order-tracking/${order.orderId}`)} // Navigate to OrderTracking page
                        >
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={styles.orderText}>Status:</span>
                                    <div style={{
                                        backgroundColor: '#363636',
                                        padding: '5px',
                                        marginLeft: '5px',
                                        borderRadius: '3px'
                                    }}>
                                        <span style={{
                                            color: order.status.toLowerCase() === 'confirmed' ? '#00B352' : '#FFAC4A',
                                            fontWeight: '700'
                                        }}>
                                            {order.status.toUpperCase() === "CONFIRMED" ? "COMPLETED" : "ONGOING"}
                                        </span>
                                    </div>
                                </div>
                                <span style={styles.orderText}>Amount: ₹{order.payment?.amount / 100}</span>
                                <span style={styles.orderText}>Item: {order.item}</span>
                                <span style={styles.orderText}>Temple: {order.templeName}</span>
                                <span style={styles.orderText}>Date of Order: {order.createdAt}</span>
                                <span style={styles.orderText}>Last Updated: {order.lastUpdated}</span>
                            </div>
                            <RiArrowRightSLine style={{ fontSize: '5rem' }} />
                        </div>
                    </div>
                ))}
                <div style={{ height: '150px' }}></div>
            </div>
        </div>
    );
};

const styles = {
    orderCard: {
        color: 'white',
        marginVertical: '15px',
        // background: '#fff', // Background color for order card
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
};

export default Orders;
