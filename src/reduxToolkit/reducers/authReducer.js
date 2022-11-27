



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../service/authService";

import { roomService } from "../../service/roomService";
import { TOKEN, USERLOGIN } from "../../utili/setup";
let user = null
if(localStorage.getItem(USERLOGIN)) {
    user = JSON.parse(localStorage.getItem(USERLOGIN) )
}

export const {reducer:authReducer, actions:authAction} = createSlice({
    name: 'auth',
    initialState:{
        isPendingUserLogin: false, userLogin: user , errUserLogin: null,
        isPendingSignup: false, userSignup: null , errSignup: null,
    },
    reducers: {
        resetUserLogin : (state,action)=> {
            state.errUserLogin = null
        },
        resetSignup: (state,action)=> {
            state.signup = null
        },
        logout : (state,action)=> {
            state.userLogin = null
            localStorage.removeItem(USERLOGIN)
            localStorage.removeItem(TOKEN)
        }
    },
    extraReducers: (builder)=> {
        builder
        // login
        .addCase(login.pending,(state,action)=> {
            state.isPendingUserLogin = true
        })
        .addCase(login.fulfilled,(state,action)=> {
            state.isPendingUserLogin = false
            state.userLogin = action.payload
            localStorage.setItem(USERLOGIN,JSON.stringify(action.payload))
            localStorage.setItem(TOKEN,JSON.stringify(action.payload.token))
        })
        .addCase(login.rejected,(state,action)=> {
            state.isPendingUserLogin = false
            state.errUserLogin = action.payload
        })
        // signup
        .addCase(signup.pending,(state,action)=> {
            state.isPendingSignup = true
        })
        .addCase(signup.fulfilled,(state,action)=> {
            state.isPendingSignup = false
            state.userSignup = action.payload
        })
        .addCase(signup.rejected,(state,action)=> {
            state.isPendingSignup = false
            state.errSignup = action.payload
        })
    }
})

// login
export const login = createAsyncThunk('login', async(data,{rejectWithValue})=> {
try{
   
    const res = await authService.login(data)
        console.log(res);
    return res.data.content
}catch(err){
        console.log(err);
    return rejectWithValue(err.response.data.content)
}
})

// signup
export const signup = createAsyncThunk('signup', async(data,{rejectWithValue})=> {
try{
   
    const res = await authService.signup(data)
    console.log(res.data.content);
    return res.data.content
}catch(err){
    console.log(err.response.data.content);
    return rejectWithValue(err.response.data.content)
}
})

