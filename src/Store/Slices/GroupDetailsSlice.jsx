import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false, // To handle the visibility of group details
    groupData: null,  // To store group data
};

const groupDetailsSlice = createSlice({
    name: "groupDetails",
    initialState,
    reducers: {
        toggleVisibility(state) {
            console.log("groupDetails", state)
            state.isVisible = !state.isVisible;
        },
        setGroupData(state, action) {
            console.log("groupDetails", state)

            state.groupData = action.payload;
        },
        clearGroupData(state) {
            console.log("groupDetails", state)

            state.groupData = null;
        }
    }
});

export const { toggleVisibility, setGroupData, clearGroupData } = groupDetailsSlice.actions;
export default groupDetailsSlice.reducer;
