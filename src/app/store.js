import { configureStore } from "@reduxjs/toolkit";

import { firebaseReducer } from "react-redux-firebase";

import generalSlice from "../features/generalSlice";
import userSlice from "../features/userSlice";

const store = configureStore({
    reducer: {
        general: generalSlice,
        firebase: firebaseReducer,
        user: userSlice
    }
});

export default store;