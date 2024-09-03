import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./Slices/ExampleSlice";

const store = configureStore({
    reducer: {
        example: exampleReducer
    }
});

export default store;
