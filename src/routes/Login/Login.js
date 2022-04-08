import { useEffect, useState } from 'react';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../features/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import './Login.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // loading screen
            return;
        }
        if (user) navigate('/home');
    }, [user, loading]);

    return (
        <div id="Login">
            <div id="container-login">
                <h2>Login</h2>
                <input 
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button id="btn-login" onClick={() => logInWithEmailAndPassword(email, password)}>Login</button>
                <button id="btn-login-google" onClick={signInWithGoogle}>Login with Google</button>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}