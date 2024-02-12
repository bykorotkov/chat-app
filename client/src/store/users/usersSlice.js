import { createSlice } from "@reduxjs/toolkit"

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        onlineUsers: [],
    },
    reducers: {
        addUser: (state, action) => {
            state.onlineUsers.push(action.payload);
        },
        removeUser: (state, action) => {
            state.onlineUsers = state.onlineUsers.filter(user => user !== action.payload)
        },
        setUsers: (state, action) => {
            state.onlineUsers = action.payload;
        }
    }
})

export const { addUser, removeUser, setUsers } = usersSlice.actions;

export default usersSlice.reducer