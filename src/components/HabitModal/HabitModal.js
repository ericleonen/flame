import './HabitModal.css';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsCreateModal, selectIsUpdateModal, toggleCreate, toggleUpdate, selectSelectedHabit } from '../../features/generalSlice';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../features/firebase';

import { v4 as uuidv4 } from 'uuid';

export const HabitModal = ({ user, habits }) => {
    const dispatch = useDispatch();
    const [habitTitle, setHabitTitle] = useState('');
    const [habitPriority, setHabitPriority] = useState(1);

    const isCreateModal = useSelector(selectIsCreateModal);
    const isUpdateModal = useSelector(selectIsUpdateModal);
    const isHabitModal = isCreateModal || isUpdateModal;
    const selectedHabit = useSelector(selectSelectedHabit);
    let modalVerb = '';

    if (isCreateModal) {
        modalVerb = 'Create';
    } else if (isUpdateModal) {
        modalVerb = 'Update';
    }

    useEffect(() => {
        setHabitTitle(selectedHabit.title);
        setHabitPriority(selectedHabit.priority);

        if (Object.keys(selectedHabit).length === 0) {
            setHabitTitle('');
            setHabitPriority(1);
        }
    }, [selectedHabit])

    const isPrioritySelected = value => Number(habitPriority) === value; 
    
    const onHabitTitleChanged = e => {
        setHabitTitle(e.target.value);
    }

    const onHabitPriorityChanged = e => {
        setHabitPriority(e.target.value);
        console.log(habitPriority);
    }

    const onCloseModal = () => {
        setHabitTitle('');
        setHabitPriority(1);

        if (isCreateModal) {
            dispatch(toggleCreate());
        }
        else {
            dispatch(toggleUpdate({}));
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        onCloseModal();

        let habitList = habits ? habits : {};

        if (isCreateModal) {
            const newHabit = {
                uuid: uuidv4(),
                title: habitTitle,
                priority: habitPriority
            }
    
            await setDoc(doc(db, 'users', user.uid), {
                habits: {
                    ...habitList, 
                    [newHabit.uuid]: newHabit,
                }
            }, { merge: true });
        }
        else {
            await setDoc(doc(db, 'users', user.uid), {
                habits: {
                    ...habitList,
                    [selectedHabit.habitId]: {
                        uuid: selectedHabit.habitId,
                        title: habitTitle,
                        priority: habitPriority
                    } 
                }
            }, { merge: true });


        }
    } 

    return isHabitModal ? (
        <div id="HabitModal">
            <div id="modal-header">
                <form onSubmit={onSubmit}>
                    <div id="container-top">
                        <h2>{modalVerb} Habit</h2>
                        <div>
                            <input type="button" value="Cancel" onClick={onCloseModal}/>
                            <input type="submit" value={modalVerb}/>
                        </div>
                    </div>
                    <label htmlFor="habit-title">Habit</label>
                    <input type="text" id="habit-title" name="habit-title" value={habitTitle} onChange={onHabitTitleChanged}/>
                    <div id="container-priority">
                    <label htmlFor="container-priority">Priority</label>
                        <div className="priority">
                            <input type="radio" name="habit-priority" value="1" id="low" onChange={onHabitPriorityChanged} checked={isPrioritySelected(1)}/>
                            <label htmlFor="low">
                                <div className="icons-fire">
                                    <FontAwesomeIcon icon={faFireFlameCurved}/>
                                </div>
                                <span>Low</span>
                            </label>
                        </div>
                        <div className="priority">
                            <input type="radio" name="habit-priority" value="2" id="mid" onChange={onHabitPriorityChanged} checked={isPrioritySelected(2)}/>
                            <label htmlFor="mid">
                                <div className="icons-fire">
                                    <FontAwesomeIcon icon={faFireFlameCurved}/>
                                    <FontAwesomeIcon icon={faFireFlameCurved}/>
                                </div>
                                <span>Mid</span>
                            </label>
                        </div>
                        <div className="priority">
                            <input type="radio" name="habit-priority" value="3" id="high" onChange={onHabitPriorityChanged} checked={isPrioritySelected(3)}/>
                            <label htmlFor="high">
                                <div className="icons-fire">
                                    <FontAwesomeIcon icon={faFireFlameCurved}/>
                                    <FontAwesomeIcon icon={faFireFlameCurved}/>
                                    <FontAwesomeIcon icon={faFireFlameCurved}/>
                                </div>
                                <span>High</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
}