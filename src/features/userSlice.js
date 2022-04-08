import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: {},
        habits: []
    },
    reducers: {
        succeedHabit: (state, action) => {

        },
        failHabit: (state, action) => {

        },
        createHabit: (state, action) => {

        },
        updateHabit: (state, action) => {

        },
        deleteHabit: (state, action) => {

        }
    }
});

export const { succeedHabit, failHabit, createHabit, updateHabit, deleteHabit } = userSlice.actions;
export const selectProfile = state => state.user.profile;
export const selectHabits = state => state.user.habits;
export default userSlice.reducer;