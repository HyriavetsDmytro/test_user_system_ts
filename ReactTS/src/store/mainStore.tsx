import { configureStore} from '@reduxjs/toolkit'
import AuthSlice from './authSlice';
import UserListSlice from './userListSlice';
import { userSystemApi } from './apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
    reducer :{ auth: AuthSlice.reducer,
        userList: UserListSlice.reducer,
        [userSystemApi.reducerPath]: userSystemApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userSystemApi.middleware),
});

setupListeners(store.dispatch);

export const userAuthActions = AuthSlice.actions
export const userListActions = UserListSlice.actions; 
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch