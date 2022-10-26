import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    name: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeName: (state, action) => {
            state.name = action.payload;
        }
    }
});

const {actions, reducer} = userSlice;

export default reducer;
export const {
    changeName
} = actions;
