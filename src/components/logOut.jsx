import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';


// My Back-end API URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Logout() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken');  // Clear token from localStorage
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        axios.get(`${BACKEND_URL}/log-out`)
        .then(response => {
            alert('Logged out successfully');
            navigate('/login');
        })
        .catch(error => {
            console.error('Logout error:', error);
            navigate('/login');
        });
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
