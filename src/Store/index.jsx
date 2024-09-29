import { configureStore } from "@reduxjs/toolkit";
import groupDetailsReducer from "./Slices/GroupDetailsSlice";

const store = configureStore({
    reducer: {
        groupDetails: groupDetailsReducer
    }
});

export default store;
