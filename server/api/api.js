const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

console.log('Loaded API Key:', process.env.GOOGLE_BOOKS_API_KEY);
const API_KEY=process.env.GOOGLE_BOOKS_API_KEY;
console.log('Google Books API Key:', API_KEY);
const API_URL = 'https://www.googleapis.com/books/v1/volumes'; 


async function searchBooks(query) {
    console.log('searchBooks function called with query:', query);
    if (!query) {
        console.error('No search query provided');
        return [];
    }

    console.log('Search query:', query);
    try {
        const response = await axios.get(API_URL, {
            params: {
                q: query,
                key: API_KEY,
            },
        });

        if (!response.data.items) {
            console.warn('No books found for the query:', query);
            return [];
        }

        console.log(`${API_URL}?q=${query}&key=${API_KEY}`);

        const books = response.data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title || 'No Title Available',
            author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'No Author Info',
            cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '/images/placeholder.jpg',
            price: 'N/A', // Update if pricing data is added
        }));

        return books;
    } catch (error) {
        if (error.response) {
            console.error(`API Error: ${error.response.status} - ${error.response.data.error.message}`);
        } else if (error.request) {
            console.error('No response from Google API:', error.request);
        } else {
            console.error('Error in API request setup:', error.message);
        }

        return [];
    }
}


module.exports = { searchBooks };