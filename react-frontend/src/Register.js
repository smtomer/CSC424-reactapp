import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "./context/AuthProvider";


export const Register = () => {
    const { value } = useAuth();
    
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/account/register', {username, phoneNumber, password, confirmPassword});
            console.log(response)

            //value.username = username
            //value.password = password
            //value.onLogin();


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
                <p>Phone Number</p>
                <input 
                    type="text" 
                    name="Phone Number" 
                    value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
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

