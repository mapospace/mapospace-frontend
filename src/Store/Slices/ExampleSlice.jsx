import { createSlice } from "@reduxjs/toolkit";

const ExampleSlice = createSlice({
    name: "example",
    initialState: [],
    reducers: {
        addExample(state, action) {
            state.push(action.payload);
        },
        // Add more reducers here as needed
    }
});

export const { addExample } = ExampleSlice.actions;
export default ExampleSlice.reducer;
