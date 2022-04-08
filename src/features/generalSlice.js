import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
    name: 'general',
    initialState: {
        isSettingsModal: false,
        isCreateModal: false,
        isUpdateModal: false,
        selectedHabit: {}
    },
    reducers: {
        toggleSettings: (state, action) => {
            state.isSettingsModal = !state.isSettingsModal;
            state.isCreateModal = false;
            state.isUpdateModal = false;
        },
        toggleCreate: (state, action) => {
            state.isSettingsModal = false;
            state.isCreateModal = !state.isCreateModal;
            state.isUpdateModal = false;
        },
        toggleUpdate: (state, action) => {
            state.isSettingsModal = false;
            state.isCreateModal = false;
            state.isUpdateModal = !state.isUpdateModal;

            state.selectedHabit = action.payload;
        }
    }
});

export const { toggleSettings, toggleCreate, toggleUpdate } = generalSlice.actions;
export const selectIsSettingsModal = state => state.general.isSettingsModal;
export const selectIsCreateModal = state => state.general.isCreateModal;
export const selectIsUpdateModal = state => state.general.isUpdateModal;
export const selectIsModal = state => selectIsSettingsModal(state) || selectIsCreateModal(state) || selectIsUpdateModal(state);
export const selectSelectedHabit = state => state.general.selectedHabit;

export default generalSlice.reducer;