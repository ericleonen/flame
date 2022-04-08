import './HabitList.css';

import { Habit } from './Habit/Habit';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../features/firebase';

export const HabitList = ({ user, habits, updateFuel }) => {

    const onCheckOffHabit = async (habitId, success) => {
        const date = new Date();

        let streak = habits[habitId]?.streak ? habits[habitId].streak : 0;
        
        if (success) {
            streak++;
            updateFuel(streak * 150);
        }
        else {
            streak = 0;
            updateFuel(-250);
        }

        await setDoc(doc(db, 'users', user.uid), {
            habits: {
                ...habits,
                [habitId]: {
                    ...habits[habitId],
                    lastDate: date.getDate(),
                    streak: streak
                }
            }
        }, { merge: true });
    }

    const onSucceed = (habitId) => {
        onCheckOffHabit(habitId, true);
    }

    const onFail = (habitId) => {
        onCheckOffHabit(habitId, false);
    }

    return (
        <div id="HabitList">
            { Object.entries(habits).map(([key, data]) => {
                const date = new Date();
                const doShow = !(data.lastDate) || date.getDate() !== data.lastDate;
                return doShow ? <Habit 
                        title={data.title} 
                        priority={data.priority} 
                        habitId={key}
                        key={key} 
                        handleSucceed={onSucceed}
                        handleFail={onFail}
                        streak={data.streak}
                       /> : null;
            }) }
        </div>
    );
}