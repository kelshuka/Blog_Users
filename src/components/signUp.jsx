import React, { useState } from 'react';
import axios from 'axios';

// My Back-end API URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${BACKEND_URL}/sign-up`, {
            username,
            email,
            password
        })
        .then(response => {
            alert('User signed up successfully');
            setUsername('');
            setEmail('');
            setPassword('');
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('Error signing up:', error);
            alert('Error signing up');
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
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
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" className="w-full bg-blue-600 text-black py-2 px-4 rounded-md hover:bg-green-700 transition">Sign Up</button>
        </form>
    );
}

export default SignUp;
