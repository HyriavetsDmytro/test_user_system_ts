import {createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    email:string,
    token: string,
    role:string,
    isAuth: boolean
}

//const timeAuth= JSON.parse(localStorage.getItem('timeAuth')|| '{}');
interface LocalInfo {
  email:string,
  token: string,
  role:string,
  time: number
}
const userInfo :LocalInfo = JSON.parse(localStorage.getItem('authUser')|| '{}');

const isInTime = !!userInfo.time && ((Number(userInfo.time) - Number(Date.now()))/(1000*60*60)>=0)
if(!isInTime){
  localStorage.removeItem('authUser');
}



const initialAuthState = { 
  ...(isInTime) &&{email:userInfo.email,token: userInfo.token,role:userInfo.role, isAuth:true},
  ...(!isInTime) && {email:'',token: '',role:'',isAuth:false},
  } as AuthState
   

const AuthSlice = createSlice({
  name: 'auth',
  initialState : initialAuthState,
  reducers: {
    setEmail(state, action: PayloadAction<string>){
        state.email = action.payload
    },
    setRole(state, action: PayloadAction<string>){
        state.role = action.payload
    },
    setToken(state, action: PayloadAction<string>){
        state.token = action.payload
    },
    setIsAuth(state, action: PayloadAction<boolean>){
        state.isAuth = action.payload
    },
    logIn: (
        state,
        { payload: { email, token ,role} }: PayloadAction<{ email: string; token: string, role:string}>
      ) => {
        state.token = token;
        state.role = role;
        state.email = email;
        state.isAuth = true
    
      },
      logOut: (state,) => {
        state.token = '';
        state.role = '';
        state.email = '';
        state.isAuth = false;
      }
  },
})
export default AuthSlice;
