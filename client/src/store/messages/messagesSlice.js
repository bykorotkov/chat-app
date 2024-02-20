import { createSlice } from "@reduxjs/toolkit"

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: []
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages = action.payload
        }
    }
})

export const {addMessage} = messagesSlice.actions;
export default messagesSlice.reducer;