import axios from "axios";
// import api from "./AxiosConfig";
import { UserAPI } from "./ServerBackEnd";


export const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if (!token || !expiresIn) return false;

    const currentTime = new Date().getTime();
    const tokenExpiryTime = parseInt(expiresIn) * 1000; // Convert expiresIn from seconds to milliseconds


    const remainingTime = tokenExpiryTime - currentTime;
    const remainingMinutes = Math.floor(remainingTime / 60000);
    const remainingSeconds = Math.floor((remainingTime % 60000) / 1000);

    console.log(`Token expires in: ${remainingMinutes} minutes and ${remainingSeconds} seconds`);

    return currentTime > tokenExpiryTime;
};

export const refreshToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {



        const response = await axios({
            method: UserAPI.Refresh_Token.method,
            url: UserAPI.Refresh_Token.url,
            data: { token },
        });

        const newAccessToken = response.data.newAccessToken;


        const expiresIn = response.data.expiresIn;
        localStorage.setItem('token', newAccessToken);
        localStorage.setItem('expiresIn', expiresIn.toString());
    } catch (error) {
        console.error('Error refreshing token:', error);
        logoutUser();
    }
};


export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');


    window.location.href = '/login';
};

