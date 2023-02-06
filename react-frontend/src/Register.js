import React, { useState } from 'react';
import axios from 'axios';

export const Register = () => {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/account/register', {username, password, confirmPassword});
            console.log(response)
        } catch (error) {
            alert(JSON.stringify(error.response.data.message))
        }
    }

    return (
        <>
        <div>
            <h2>Sign Up</h2>
            <form>
                <p>Username</p>
                <input 
                    type="text" 
                    name="Username" 
                    value={username} onChange={e => setName(e.target.value)}/>
                <p>Password</p>
                <input 
                    type="password" 
                    name="Password" 
                    value={password} onChange={e => setPassword(e.target.value)}/>
                <p>Confirm Password</p>
                <input 
                    type="password" 
                    name="Confirm Password" 
                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            </form>
            <button type="submit" onClick={handleSubmit}>
                Sign Up
            </button>
        </div>
        </>
    );
};

