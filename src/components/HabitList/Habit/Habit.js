import './Habit.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import { toggleUpdate } from '../../../features/generalSlice';
import { useDispatch } from 'react-redux';

export const Habit = ({ title, priority, habitId, handleSucceed, handleFail, streak }) => {
    const dispatch = useDispatch();
    
    return (
        <div className="Habit">
            <button className="habit-btn success" onClick={() => handleSucceed(habitId)}>
                <FontAwesomeIcon icon={faCheck} />
            </button>
            <div className="habit-body" onClick={() => dispatch(toggleUpdate({habitId, priority, title}))}>
                <div className="habit-label">{title}</div>
                <div className="habit-streak">Streak: {streak ? streak : 0}</div>
            </div>
            <button className="habit-btn failure" onClick={() => handleFail(habitId)}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
}