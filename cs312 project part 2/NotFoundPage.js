import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ fontSize: '3em', color: '#ff4040' }}>404 - Page Not Found</h1>
            <p>The page you are looking for doesn't exist.</p>
            <button
                onClick={() => navigate('/')}
                style={{
                    padding: '10px 20px',
                    fontSize: '1.2em',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Go to Homepage
            </button>
        </div>
    );
};

export default NotFoundPage;
