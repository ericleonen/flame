import { collection, getDocs, query, where } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { db } from '../../features/firebase';
import './Home.css';

import { Shader } from '../../components/Shader/Shader';
import { Header } from '../../components/Header/Header';
import { Stats } from '../../components/Stats/Stats';
import { HabitModal } from '../../components/HabitModal/HabitModal';
import { HabitList } from '../../components/HabitList/HabitList';

import { auth } from '../../features/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export const Home = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState({});
    const [habits, setHabits] = useState({});
    const navigate = useNavigate();

    const updateFuel = async (amount) => {
        if (amount < 0 && -amount > userData.fuel) {
            amount = -userData.fuel;
        }

        await setDoc(doc(db, 'users', user.uid), {
            fuel: userData.fuel + amount
        }, { merge: true });
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate('/');

        const q = query(collection(db, 'users'), where('uid', '==', user?.uid));

        const unsubscribe = onSnapshot(q, (snap) => {
            const { name, fuel, habits } = snap.docs[0].data();

            setUserData({
                name,
                fuel
            });

            setHabits(habits);
        });
    }, [user, loading]);

    return (
        <div id="Home">
            <Shader />
            <HabitModal user={user} habits={habits}/>
            <Header />
            <div id="content">
                <Stats user={userData}/>
                <HabitList user={user} habits={habits} updateFuel={updateFuel}/>
            </div>
        </div>
    );
}