import React from 'react';

const SearchBar = ({ setSearchQuery }) => {
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update the search query in the parent component
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by title, author, or genre..."
                onChange={handleSearchChange}
                style={{
                    padding: '10px',
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
        </div>
    );
};

export default SearchBar;
