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
                alert('Login successful');
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
        <form onSubmit={handleLogin}>
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
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default Login;
