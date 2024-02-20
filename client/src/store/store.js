import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice';
import messagesReducer from './messages/messagesSlice'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        messages: messagesReducer
    }
});
