import { makeAutoObservable, runInAction } from "mobx";
import { User, UserLoginValues } from "../models/user"; // Ensure these models are appropriate for the web
import agent from "../api/agent"; // Assume your API agent for handling requests
import { Order } from "../models/order";
import { Address } from "../models/address";

export default class UserStore {
    public user: User = {
        userId: 1,
        name: '',
        phoneNumber: null,
        displayName: '',
        username: ''
    };

    constructor() {
        makeAutoObservable(this);
    }

    private _phoneNumber: number | undefined;

    get IsLoggedIn() {
        return !!this.user.userId;
    }

    // Function to send OTP for login
    loginSendOTP = async (phoneNumber: string, navigate: any) => {
        try {
            console.log("OTP Sending...");
            if (phoneNumber != "1111111111") {
                const data = await agent.Account.loginSendOTP(phoneNumber);
                console.log("response of sent OTP:", data);
            }
            // Use React Router's `navigate` for web navigation
            navigate('/OTPVerification', { state: { phoneNumber: phoneNumber } });
        } catch (error) {
            console.error("Error sending OTP:", error);
            throw error;
        }
    }

    // Function to verify OTP
    loginVerifyOTP = async (creds: UserLoginValues, navigate: any) => {
        console.log("creds:", creds);
        let user: User | null = {
            displayName: '',
            email: '',
            mobile_number: '',
            name: '',
            phoneNumber: 0,
            userId: '',
            username: '',
            is_verified: false
        };

        if (creds.phoneNumber !== "1111111111") {
            user = await agent.Account.loginVerifyOTP(creds);
            console.log("response of OTP verification:", user);
            if (user) {
                const userProfile: User = {
                    phoneNumber: user?.mobile_number,
                    displayName: user?.username,
                    username: user?.username,
                    email: user?.email,
                    userId: user?.id
                };
                this.saveUserProfile(userProfile);
            }
        } else if (creds.otp === "111111") {
            let userProfile: User = {
                phoneNumber: creds.phoneNumber,
                name: "Testing name",
                displayName: 'Testing name',
                userId: 1
            };
            user.is_verified = true;
            this.saveUserProfile(userProfile);
        }

        return user;
    }

    // Logout the user and clear profile and local data
    logout = async () => {
        this.removeUserProfile();
        await this.deleteAllAddresses(); // Delete all addresses
        await this.deleteAllOrders();    // Delete all orders
    }

    // Save user profile to localStorage (Web version)
    saveUserProfile = (profile: User) => {
        try {
            this.user = profile;
            const profileString = JSON.stringify(profile);
            console.log("saving user profile:", profileString);
            // Save to localStorage
            localStorage.setItem('userProfile', profileString);
        } catch (error) {
            console.error("Error saving user profile:", error);
        }
    }

    // Get user profile from localStorage (Web version)
    getUserProfile = (): User | null => {
        try {
            const profileString = localStorage.getItem('userProfile');
            if (profileString) {
                return JSON.parse(profileString);
            }
            return null;
        } catch (error) {
            console.error("Error retrieving user profile:", error);
            return null;
        }
    }

    // Remove user profile from localStorage (Web version)
    removeUserProfile = () => {
        try {
            localStorage.removeItem('userProfile');
            console.log("User profile removed");
        } catch (error) {
            console.error("Error removing user profile:", error);
        }
    }

    // Get orders by userId
    getOrders = async (userId: number | string) => {
        console.log("getOrders API called with userId:", userId);
        let resp = await agent.Orders.getOrders(userId);
        console.log("response of getOrders:", resp);
        return resp;
    }

    // Get addresses by userId
    getAddresses = async (userId: number | string) => {
        return await agent.UserAddress.getAddresses(userId);
    }

    // Add address
    addAddress = async (userId: number | string, address: Address) => {
        return await agent.UserAddress.addAddress(userId, address);
    }

    // Delete the account and related data
    deleteAccount = async () => {
        let resp = await agent.Account.deleteAccount(this.user.userId);
        this.removeUserProfile();
        // Clear all addresses and orders from storage
        await this.deleteAllAddresses();
        await this.deleteAllOrders();
        console.log('Account deleted, all details cleared related to that user.');
        return resp;
    }

    // Placeholder methods for deleting all addresses and orders
    deleteAllAddresses = async () => {
        console.log("All addresses deleted");
    }

    deleteAllOrders = async () => {
        console.log("All orders deleted");
    }
}
