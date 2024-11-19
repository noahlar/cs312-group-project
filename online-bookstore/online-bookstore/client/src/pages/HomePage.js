import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SortBar from '../components/SortBar';
import BookList from '../components/BookList';

const HomePage = () => {
    const [books, setBooks] = useState([]); // State for the list of books
    const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered and sorted books
    const [searchQuery, setSearchQuery] = useState(''); // State for the search query
    const [sortBy, setSortBy] = useState('title'); // State for sorting criteria
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    // Fetch book data from the API when the component mounts
    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/books'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch books.');
                }
                const data = await response.json();
                setBooks(data);
                setFilteredBooks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []);

    // Update filteredBooks whenever searchQuery or sortBy changes
    useEffect(() => {
        let updatedBooks = books;

        // Filter books based on search query
        if (searchQuery) {
            updatedBooks = books.filter(
                (book) =>
                    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort books based on selected criteria
        updatedBooks = updatedBooks.sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            } else if (sortBy === 'author') {
                return a.author.localeCompare(b.author);
            } else if (sortBy === 'rating') {
                return b.rating - a.rating;
            }
            return 0;
        });

        setFilteredBooks(updatedBooks);
    }, [searchQuery, sortBy, books]);

    // Render the component
    return (
        <div className="homepage" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Online Bookstore</h1>

            {/* Error Message */}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            {/* Loading Indicator */}
            {isLoading && <p style={{ textAlign: 'center' }}>Loading books...</p>}

            {/* Content */}
            {!isLoading && !error && (
                <>
                    {/* Search Bar */}
                    <SearchBar setSearchQuery={setSearchQuery} />

                    {/* Sort Bar */}
                    <SortBar setSortBy={setSortBy} />

                    {/* Book List */}
                    <BookList
                        books={filteredBooks}
                        onBookClick={(book) => console.log('Book clicked:', book)} // Placeholder for book click handler
                    />
                </>
            )}
        </div>
    );
};

export default HomePage;
