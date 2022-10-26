import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    replyOn: null
}

const userSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setReplyId: (state, action) => {
            state.replyOn = action.payload;
        }
    }
});

const {actions, reducer} = userSlice;

export default reducer;
export const {
    setMessages,
    addMessage,
    setReplyId
} = actions;
