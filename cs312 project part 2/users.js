import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchUserDetails = async (userId) => {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
};

export const fetchPurchaseHistory = async (userId) => {
    const response = await axios.get(`${API_URL}/users/${userId}/purchase-history`);
    return response.data;
};
