const axios = require('axios');
require('dotenv').config({ path: './server/.env' });
const API_KEY=process.env.GOOGLE_BOOKS_API_KEY;
const API_URL = 'https://www.googleapis.com/books/v1/volumes'; 

async function searchBooks(query){
    console.log('Search query: ', query);
    try{
        const response = await axios.get(API_URL, {
            params: {
                q: query,
                key: API_KEY,
            },
        });
        const books = response.data.items ? response.data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title || 'No Title Available',
            author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'No Author Info',
            cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '/images/placeholder.jpg',
            price: 'N/A',  
        })) : [];

        return books;
    } catch (error) {
        console.error('Error fetching books from Google API:', error);
        return [];
    }
}

module.exports = { searchBooks };