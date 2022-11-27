

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentService } from "../../service/commentService";

import { roomService } from "../../service/roomService";



export const {reducer:commentReducer, actions:commentAction} = createSlice({
    name: 'getCommentList',
    initialState:{
        isPendingCommentList: false, commentList: [] , errCommentList: null,
        isPendingPostComment: false, postComment: null , errPostComment: null,

    },
    reducers: {},
    extraReducers: (builder)=> {
        builder
        // getCommentList
        .addCase(getCommentList.pending,(state,action)=> {
            state.isPendingCommentList = true
        })
        .addCase(getCommentList.fulfilled,(state,action)=> {
            state.isPendingCommentList = false
            state.commentList = action.payload
        })
        .addCase(getCommentList.rejected,(state,action)=> {
            state.isPendingCommentList = false
            state.errCommentList = action.payload
        })
        // postCommentList
        .addCase(postComment.pending,(state,action)=> {
            state.isPendingCommentList = true
        })
        .addCase(postComment.fulfilled,(state,action)=> {
            state.isPendingCommentList = false
            state.commentList = action.payload
        })
        .addCase(postComment.rejected,(state,action)=> {
            state.isPendingCommentList = false
            state.errCommentList = action.payload
        })

  
    }
})

// getCommentList
export const getCommentList = createAsyncThunk('getCommentList', async(_,{rejectWithValue})=> {
try{
  
    const res = await commentService.getCommentList()
   
    return res.data.content
}catch(err){
   
    return rejectWithValue(err.response.data.content)
}
})
// postCommentList
export const postComment = createAsyncThunk('postComment', async(data,{getState,dispatch,rejectWithValue})=> {
try{
  
    const res = await commentService.postComment(data)
    dispatch(getCommentList())
    console.log(res.data.message);
    return res.data.content
}catch(err){
   
    return rejectWithValue(err.response.data.content)
}
})
