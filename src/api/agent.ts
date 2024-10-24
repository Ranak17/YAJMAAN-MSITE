import axios, { AxiosResponse } from "axios";
import { DarshanAddComments, DarshanVideosRequestDTO, DarshanCommentsResponseDTO, DarshanVideo, DarshanVisitorCounterRequestDTO, DarshanVisitorCounterResponseDTO, Temple } from "../models/darshan";
import { PoojaDetailRequestDTO, PoojaDetailResponseDTO, PoojaOffering, PoojaPackage } from "../models/pooja";
import { User, UserLoginValues } from "../models/user";
import { PaymentDetail, PaymentResp } from "../models/payment";
import { Order } from "../models/order";
import { Address } from "../models/address";
//artificail latency


axios.defaults.baseURL = 'http://13.53.229.65:3000/api/'; //http
// axios.defaults.baseURL = 'https://yajmaan.in:4433/api/'; //https

// axios.interceptors.request.use(config => {
//     const token = store.commonStore.token;
//     if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// }, error => {
//     return Promise.reject(error);
// })


// axios.interceptors.response.use(

//     async response => {
//         await sleep(1000);
//         return response;
//     }, (error: AxiosError) => {
//         const { data, status, config } = error.response as AxiosResponse;
//         //console.log("status : ", status);
//         //console.log("data : ", data);
//         switch (status) {
//             case 400:
//                 if (config.method === "get" && data.errors.hasOwnProperty('id')) {
//                     router.navigate('/not-found');
//                 }
//                 if (data.errors) {
//                     const modalStateErrors = [];
//                     for (const key in data.errors) {
//                         if (data.errors[key]) {
//                             modalStateErrors.push(data.errors[key]);
//                         }
//                     }
//                     throw modalStateErrors.flat();
//                 } else {
//                     toast.error(data);
//                 }
//                 break;
//             case 401:
//                 toast.error('Unauthorised');
//                 break;
//                 // case 403:
//                 toast.error('Forbidden');
//                 break;
//             case 404:
//                 router.navigate('/not-found');
//                 break;
//             case 500:
//                 store.commonStore.setServorError(data);
//                 router.navigate('/server-error');
//                 break;
//         }
//         return Promise.reject(error);
//     })

// axios.interceptors.response.use(
//     async response => {
//         await sleep(1000);
//         return response;
//     },
//     (error: AxiosError) => {
//         const { data, status, config } = error.response as AxiosResponse;
//         console.error("Error Status:", status);
//         console.error("Error Data:", data);

//         switch (status) {
//             case 400:
//                 console.error("Bad Request:", data);
//                 break;
//             case 401:
//                 console.error("Unauthorized access:", data);
//                 break;
//             case 403:
//                 console.error("Forbidden:", data);
//                 break;
//             case 404:
//                 console.error("Not Found:", data);
//                 break;
//             case 500:
//                 console.error("Server Error:", data);
//                 break;
//             default:
//                 console.error("Unknown Error:", data);
//                 break;
//         }
//         return Promise.reject(error);
//     }
// );

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => {
        // //console.log("url : ", url);
        return axios.post<T>(url, body, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(responseBody);
    },
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}


const Account = {
    loginSendOTP: (phoneNumber: string) => requests.post<any>('login/send-otp', { phoneNumber }),
    loginVerifyOTP: (cred: UserLoginValues) => requests.post<any>('login/verify-otp', cred),
    deleteAccount: (userID: string | number) => requests.del<any>(`login/delete/${userID}`),
    updateUserDetails: (user: User) => requests.post<any>('/users/update', user)
}

const Darshan = {
    getVideos: async (request: DarshanVideosRequestDTO) => {
        try {
            console.log("request : ", request);
            const response = await requests.post<any>('darshan/videos', request); // Await the promise
            // console.log("response : ", response);
            return response; // Return the response for further use
        } catch (error) {
            console.error("Error fetching videos: ", error);
            throw error; // Rethrow error for handling upstream
        }
    },
    getFilteredVideos: async (request: DarshanVideosRequestDTO) => {
        try {
            console.log("request : ", request);
            const response = await requests.post<any>('darshan/filtered-videos', request); // Await the promise
            return response; // Return the response for further use
        } catch (error) {
            console.error("Error fetching videos: ", error);
            throw error; // Rethrow error for handling upstream
        }
    },
    getTempleDetailByID: (id: string | number) => requests.get<Temple>(`darshan/temple/${id}`),
    addComments: (request: DarshanAddComments) => requests.post<DarshanCommentsResponseDTO>('darshan/add-comment', request),
    updateVisitorCount: (videoID: any) => requests.get(`darshan/increment-view-count?id=${videoID}`)
}

const Transaction = {
    createUPIOrder: (req: PaymentDetail) => requests.post<any>('payment/create-upi-order', req),
    verifyPayment: (req: any) => requests.post<any>('payment/verify-payment', req)
}

const Orders = {
    getOrders: (userId: number | string) => requests.get<Order[]>(`order/user/${userId}`)
}

const UserAddress = {
    getAddresses: (userId: number | string) => {
        console.log("getAddress api hit with userID : ", userId);
        return requests.get<Address[]>(`address/user/${userId}`);
    },
    addAddress: (userId: number | string, address: Address) => requests.post<Address>(`address/user/${userId}`, address)
}

const agent = {
    Account,
    Darshan,
    Transaction,
    Orders,
    UserAddress
}

export default agent;