import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./Slices/ExampleSlice";
import groupDetailsReducer from "./Slices/GroupDetailsSlice";

const store = configureStore({
    reducer: {
        example: exampleReducer,
        groupDetails: groupDetailsReducer
    }
});

export default store;
