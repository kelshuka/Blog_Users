import React, { useState, useEffect } from 'react';
import axios from 'axios';


// My Back-end API URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Logout() {
    const handleLogout = () => {
        localStorage.removeItem('userToken');  // Clear token from localStorage
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        axios.get(`${BACKEND_URL}/log-out`)
        .then(response => {
            alert('Logged out successfully');
            window.location.href = '/login';  // Or use react-router's useNavigate for routing
        })
        .catch(error => {
            console.error('Logout error:', error);
            window.location.href = '/login';
        });
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
