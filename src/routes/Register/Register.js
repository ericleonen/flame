import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword, signInWithGoogle } from '../../features/firebase';
import { auth } from '../../features/firebase';
import './Register.css';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name) console.log('Please enter name');
        registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate('/home');
    }, [user, loading]);

    return (
        <div id="Register">
            <div id="container-register">
                <h2>Register</h2>
                <input 
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full Name"
                />
                <input 
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="E-Mail Address"
                />
                <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button id="btn-register" onClick={register}>Register</button>
                <button id="btn-register-google" onClick={signInWithGoogle}>Register with Google</button>
            </div>
        </div>
    );
};