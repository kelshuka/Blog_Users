import React, { useState } from 'react';
import axiosInstance from '../api';

import { useNavigate } from 'react-router-dom';



function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axiosInstance.post('/log-in', { username, password })
        .then(response => {
            const { token, user} = response.data;  // Assuming JWT is returned

            if (user) {
                localStorage.setItem('userToken', token);  // Store the token in localStorage
                localStorage.setItem('userType', user.type);  // Store user type
                localStorage.setItem('userId', user.id);  // Store the user ID
                navigate('/blogPage/allposts');
            } else {
                throw new Error('User data is missing in response');
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            setError('Invalid username or password');
        });
    };

    return (
        <form onSubmit={handleLogin} className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button type="submit" className="w-full bg-green-500 text-black py-2 px-4 rounded-md hover:bg-green-700 transition">
                Login
            </button>
            
        </form>
    );
}

export default Login;
