import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchPricing = async (bookId) => {
    const response = await axios.get(`${API_URL}/pricing/${bookId}`);
    return response.data;
};
