import { sendPasswordResetEmail } from '@firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../features/firebase';
import './Reset.css';

export const Reset = () => {
    const [email, setEmail] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate('/home');
    }, [user, loading]);

    return (
        <div id="Reset">
            <div id="container-reset">
                <h2>Reset Password</h2>
                <input 
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <button id="btn-reset" onClick={() => sendPasswordResetEmail(email)}>Send Password Reset Email</button>
                <div>Don't have an account <Link to="/register">Register</Link> now.</div>
            </div>
        </div>
    )
}