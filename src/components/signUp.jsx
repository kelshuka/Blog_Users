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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;
