

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { roomService } from "../../service/roomService";
import { userService } from "../../service/userService";



export const {reducer:userReducer, actions:userAction} = createSlice({
    name: 'user',
    initialState:{
        isPendingDetailUser: false, detailUser: null , errDetailUser: null,
        isPendingEditUser: false, editUser: null , errEditUser: null,
        isPendingUserList: false, userList: [] , errUserList: null,
        isPendingDeleteUser: false, deleteUser: null , errdeleteUser: null,
        isPendingPostUser: false, postUser1: null , errPostUser: null,
        isPendingSearchUser: false, searchUser1: null , errSearchUser: null,
        isPendingPostAvatar: false, postAvatar: null , errPostAvatar: null,
    },
    reducers:
     {
        resetPostUser: (state,action)=> {
            state.postUser1 = null
            state.errPostUser = null
        }
    },
    extraReducers: (builder)=> {
        builder
        // getDetailUser
        .addCase(getDetailUser.pending,(state,action)=> {
            state.isPendingDetailUser = true
        })
        .addCase(getDetailUser.fulfilled,(state,action)=> {
            state.isPendingDetailUser = false
            state.detailUser = action.payload
        })
        .addCase(getDetailUser.rejected,(state,action)=> {
            state.isPendingDetailUser = false
            state.errDetailUser = action.payload
        })

        // editUser
        .addCase(editUser.pending,(state,action)=> {
            state.isPendingEditUser = true
        })
        .addCase(editUser.fulfilled,(state,action)=> {
            state.isPendingEditUser = false
            state.editUser = action.payload
        })
        .addCase(editUser.rejected,(state,action)=> {
            state.isPendingEditUser = false
            state.errEditUser = action.payload
        })
        // getUserList
        .addCase(getUserList.pending,(state,action)=> {
            state.isPendingUserList = true
        })
        .addCase(getUserList.fulfilled,(state,action)=> {
            state.isPendingUserList = false
            state.userList = action.payload
        })
        .addCase(getUserList.rejected,(state,action)=> {
            state.isPendingUserList = false
            state.errUserList = action.payload
        })
        // deleteUser
        .addCase(deleteUser.pending,(state,action)=> {
            state.isPendingDeleteUser = true
        })
        .addCase(deleteUser.fulfilled,(state,action)=> {
            state.isPendingDeleteUser = false
            state.deleteUser = action.payload
        })
        .addCase(deleteUser.rejected,(state,action)=> {
            state.isPendingDeleteUser = false
            state.errdeleteUser = action.payload
        })
        // postUser
        .addCase(postUser.pending,(state,action)=> {
            state.isPendingPostUser = true
        })
        .addCase(postUser.fulfilled,(state,action)=> {
            state.isPendingPostUser = false
            state.postUser1 = action.payload
        })
        .addCase(postUser.rejected,(state,action)=> {
            state.isPendingPostUser = false
            state.errPostUser = action.payload
        })
        //searchUser
        .addCase(searchUser.pending,(state,action)=> {
            state.isPendingSearchUser = true
        })
        .addCase(searchUser.fulfilled,(state,action)=> {
            state.isPendingSearchUser = false
            state.searchUser1 = action.payload
        })
        .addCase(searchUser.rejected,(state,action)=> {
            state.isPendingSearchUser = false
            state.searchUser1 = null
            state.errSearchUser = action.payload
        })
        //postAvatar
        .addCase(postAvatar.pending,(state,action)=> {
            state.isPendingPostAvatar = true
        })
        .addCase(postAvatar.fulfilled,(state,action)=> {
            state.isPendingPostAvatar = false
            state.postAvatar = action.payload
        })
        .addCase(postAvatar.rejected,(state,action)=> {
            state.isPendingSearchUser = false
            state.errPostAvatar = action.payload
        })
    }
})

// getDetailUser
export const getDetailUser = createAsyncThunk('getDetailUser', async(data,{rejectWithValue})=> {
try{
  
    const res = await userService.getDetailUser(data)
 
    return res.data.content
}catch(err){
   
    return rejectWithValue(err.response.data.content)
}
})
//editUser
export const editUser = createAsyncThunk('editUser', async(data,{rejectWithValue})=> {
try{
    console.log(data);

    const res = await userService.editUser(data)
        console.log(res.data.content);
    return res.data.content
}catch(err){
    console.log(err);
    return rejectWithValue(err.response.data.content)
}
})
//getUserList
export const getUserList = createAsyncThunk('getUserList', async(_,{rejectWithValue})=> {
try{
 
    const res = await userService.getUserList()
   
    return res.data.content
}catch(err){
  
    return rejectWithValue(err.response.data.content)
}
})
//deleteUser
export const deleteUser = createAsyncThunk('deleteUser', async(data,{dispatch,rejectWithValue})=> {
try{
    const res = await userService.deleteUser(data)
    dispatch(getUserList())
    return res.data.content
}catch(err){
  
    return rejectWithValue(err.response.data.content)
}
})

// postuser
export const postUser = createAsyncThunk('postUser', async(data,{dispatch,rejectWithValue})=> {
try{
    const res = await userService.postUser(data)
    dispatch(getUserList())
    console.log(res);
    return res.data.content
}catch(err){
    console.log(err);
    return rejectWithValue(err.response.data.content)
}
})

// searchUser
export const searchUser = createAsyncThunk('searchUser', async(data,{dispatch,rejectWithValue})=> {
try{
    const res = await userService.searchUser(data)
   
  
    return res.data.content
}catch(err){
  
    return rejectWithValue(err.response.data.content)
}
})
// postAvatar
export const postAvatar = createAsyncThunk('postAvatar', async(data,{dispatch,rejectWithValue})=> {
try{
    const res = await userService.postAvatar(data)
    dispatch(getDetailUser())
    console.log(res);
    return res.data.content
}catch(err){
    console.log(err);
    return rejectWithValue(err.response.data.content)
}
})