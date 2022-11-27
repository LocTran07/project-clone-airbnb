


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { roomService } from "../../service/roomService";



export const {reducer:roomReducer, actions:roomAction} = createSlice({
    name: 'room',
    initialState:{
        isPendingRoomLocation: false, roomLocation: null , errRoomLocation: null,
        isPendingRoomById: false, roomById: null , errRoomById: null,
        isPendingRoomList: false, roomList: [] , errRoomList: null,
        isPendingPutRoom: false, putRoom: null , errPutRoom: null,
        isPendingDeleteRoom: false, deleteRoom: null , errDeleteRoom: null,
        isPendingPostRoom: false, postRoom1: null , errPostRoom1: null,
        isPendingSearchRoom: false, searchRoom1: null , errSearchRoom1: null,
    },
    reducers: {
        resetRoom : (state,action)=> {
            state.postRoom1  = null
            state.errPostRoom1 = null
        }   
    },
    extraReducers: (builder)=> {
        builder
        // getRoomLocation
        .addCase(getRoomLocation.pending,(state,action)=> {
            state.isPendingRoomLocation = true
        })
        .addCase(getRoomLocation.fulfilled,(state,action)=> {
            state.isPendingRoomLocation = false
            state.roomLocation = action.payload
        })
        .addCase(getRoomLocation.rejected,(state,action)=> {
            state.isPendingRoomLocation = false
            state.errRoomLocation = action.payload
        })

        //getRoomById
        .addCase(getRoomById.pending,(state,action)=> {
            state.isPendingRoomById = true
        })
        .addCase(getRoomById.fulfilled,(state,action)=> {
            state.isPendingRoomById = false
            state.roomById = action.payload
        })
        .addCase(getRoomById.rejected,(state,action)=> {
            state.isPendingRoomById = false
            state.errRoomById = action.payload
        })
        //getRoomList
        .addCase(getRoomList.pending,(state,action)=> {
            state.isPendingRoomList = true
        })
        .addCase(getRoomList.fulfilled,(state,action)=> {
            state.isPendingRoomList = false
            state.roomList = action.payload
        })
        .addCase(getRoomList.rejected,(state,action)=> {
            state.isPendingRoomList = false
            state.errRoomList = action.payload
        })
        //putRoom
        .addCase(putRoom.pending,(state,action)=> {
            state.isPendingPutRoom = true
        })
        .addCase(putRoom.fulfilled,(state,action)=> {
            state.isPendingPutRoom = false
            state.putRoom = action.payload
        })
        .addCase(putRoom.rejected,(state,action)=> {
            state.isPendingPutRoom = false
            state.errPutRoom = action.payload
        })
        //deleteRoom
        .addCase(deleteRoom.pending,(state,action)=> {
            state.isPendingDeleteRoom = true
        })
        .addCase(deleteRoom.fulfilled,(state,action)=> {
            state.isPendingDeleteRoom = false
            state.deleteRoom = action.payload
        })
        .addCase(deleteRoom.rejected,(state,action)=> {
            state.isPendingDeleteRoom = false
            state.errDeleteRoom = action.payload
        })
        //postRoom
        .addCase(postRoom.pending,(state,action)=> {
            state.isPendingPostRoom = true
        })
        .addCase(postRoom.fulfilled,(state,action)=> {
            state.isPendingPostRoom = false
            state.postRoom1 = action.payload
        })
        .addCase(postRoom.rejected,(state,action)=> {
            state.isPendingPostRoom = false
            state.errPostRoom1 = action.payload
        })
        // searchRoom
        .addCase(searchRoom.pending,(state,action)=> {
            state.isPendingSearchRoom = true
        })
        .addCase(searchRoom.fulfilled,(state,action)=> {
            state.isPendingSearchRoom = false
            state.searchRoom1 = action.payload
        })
        .addCase(searchRoom.rejected,(state,action)=> {
            state.isPendingSearchRoom = false
            state.errPostRoom1 = action.payload
        })
    }
    
})

// getRoomLocation
export const getRoomLocation = createAsyncThunk('getRoomLocation', async(data,{rejectWithValue})=> {
try{
  
    const res = await roomService.getRoomLocation(data)
 
    return res.data.content
}catch(err){
   
    return rejectWithValue(err.response.data.content)
}
})
// getRoomById
export const getRoomById = createAsyncThunk('getRoomById', async(data,{rejectWithValue})=> {
try{
  
    const res = await roomService.getRoomById(data)
  
    return res.data.content
}catch(err){
   
    return rejectWithValue(err.response.data.content)
}
})
// getRoomList
export const getRoomList = createAsyncThunk('getRoomList', async(data,{rejectWithValue})=> {
try{
  
    const res = await roomService.getRoomList()
  
    return res.data.content
}catch(err){
   
    return rejectWithValue(err.response.data.content)
}
})
// putRoom
export const putRoom = createAsyncThunk('putRoom', async(data,{dispatch,rejectWithValue})=> {
try{
  
    const res = await roomService.putRoom(data)
    dispatch(getRoomList())
    return res.data.content
}catch(err){
   
    return rejectWithValue(err.response.data.content)
}
})
// deleteRoom
export const deleteRoom = createAsyncThunk('deleteRoom', async(data,{dispatch,rejectWithValue})=> {
try{
  
    const res = await roomService.deleteRoom(data)

    dispatch(getRoomList())
    return res.data.content
}catch(err){
    console.log(err.response.data.content);
    return rejectWithValue(err.response.data.content)
}
})
// postRoom
export const postRoom = createAsyncThunk('postRoom', async(data,{dispatch,rejectWithValue})=> {
try{
  
    const res = await roomService.postRoom(data)

    dispatch(getRoomList())
    return res.data.content
}catch(err){
    console.log(err.response.data.content);
    return rejectWithValue(err.response.data.content)
}
})
// searchRoom
export const searchRoom = createAsyncThunk('searchRoom', async(data,{dispatch,rejectWithValue})=> {
try{
  
    const res = await roomService.searchRoom(data)

  
    return res.data.content.data
}catch(err){
    console.log(err.response.data.content);
    return rejectWithValue(err.response.data.content)
}
})