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
            navigate('/login');
        })
        .catch(error => {
            console.error('Logout error:', error);
            navigate('/login');
        });
    };

    return (
        <div className='flex flex-col text-center flex-gap pt-20'>
            <section>Want to log out?</section>
            <button onClick={handleLogout} className="text-red-500">Logout</button>
        </div>
    );
         
}

export default Logout;
