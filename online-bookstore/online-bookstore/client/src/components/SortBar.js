import React from 'react';

const SortBar = ({ setSortBy }) => {
    const handleSortChange = (e) => {
        setSortBy(e.target.value); // Update the sorting option in the parent component
    };

    return (
        <div style={{ margin: '20px 0' }}>
            <label htmlFor="sortBy" style={{ marginRight: '10px' }}>
                Sort By:
            </label>
            <select
                id="sortBy"
                onChange={handleSortChange}
                style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="rating">Rating</option>
            </select>
        </div>
    );
};

export default SortBar;
