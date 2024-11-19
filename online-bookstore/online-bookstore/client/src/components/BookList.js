import React from 'react';

const BookList = ({ books, onBookClick }) => {
    return (
        <div className="book-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {books.length > 0 ? (
                books.map((book) => (
                    <div
                        key={book.id}
                        className="book-item"
                        style={{
                            border: '1px solid #ddd',
                            padding: '15px',
                            borderRadius: '5px',
                            width: '200px',
                            textAlign: 'center',
                            backgroundColor: '#fff',
                            cursor: 'pointer',
                        }}
                        onClick={() => onBookClick(book)}
                    >
                        <h3>{book.title}</h3>
                        <p>by {book.author}</p>
                        <p>Genre: {book.genre}</p>
                    </div>
                ))
            ) : (
                <p>No books found.</p>
            )}
        </div>
    );
};

export default BookList;
