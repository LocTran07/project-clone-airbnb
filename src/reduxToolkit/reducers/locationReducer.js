import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { locationService } from "../../service/locationService";



export const {reducer:locationReducer, actions:locationAction} = createSlice({
    name: 'location',
    initialState:{
        isPendingLocationList: false, locationList: [] , errLocationList: null,
        isPendingLocationById: false, locationById: {} , errLocationById: null,
        isPendingDeleteLocation: false, deleteLocation: null , errdeleteLocation: null,
        isPendingPutLocation: false, putLocation: null , errputLocation: null,
        isPendingPostLocation: false, postLocation1: null , errpostLocation: null,
        isPendingSearchLocation: false, searchLocation1: null , errsearchLocation: null,
    },
    reducers: {
        resetPostLocation : (state,action)=> {
            state.postLocation1 = false
            state.errpostLocation = false
        }
    },
    extraReducers: (builder)=> {
        builder
        // getLocationList
        .addCase(getLocation.pending,(state,action)=> {
            state.isPendingLocationList = true
        })
        .addCase(getLocation.fulfilled,(state,action)=> {
            state.isPendingLocationList = false
            state.locationList = action.payload
        })
        .addCase(getLocation.rejected,(state,action)=> {
            state.isPendingLocationList = false
            state.errLocationList = action.payload
        })
        // getLocationById
        .addCase(getLocationById.pending,(state,action)=> {
            state.isPendingLocationById = true
        })
        .addCase(getLocationById.fulfilled,(state,action)=> {
            state.isPendingLocationById = false
            state.locationById = action.payload
        })
        .addCase(getLocationById.rejected,(state,action)=> {
            state.isPendingLocationById = false
            state.errLocationById = action.payload
        })
        // deleteLocation
        .addCase(deleteLocation.pending,(state,action)=> {
            state.isPendingDeleteLocation = true
        })
        .addCase(deleteLocation.fulfilled,(state,action)=> {
            state.isPendingDeleteLocation = false
            state.deleteLocation = action.payload
        })
        .addCase(deleteLocation.rejected,(state,action)=> {
            state.isPendingDeleteLocation = false
            state.errdeleteLocation = action.payload
        })
        // putLocation
        .addCase(putLocation.pending,(state,action)=> {
            state.isPendingPutLocation = true
        })
        .addCase(putLocation.fulfilled,(state,action)=> {
            state.isPendingPutLocation = false
            state.putLocation = action.payload
        })
        .addCase(putLocation.rejected,(state,action)=> {
            state.isPendingPutLocation = false
            state.errputLocation = action.payload
        })
        // postLocation
        .addCase(postLocation.pending,(state,action)=> {
            state.isPendingPostLocation = true
        })
        .addCase(postLocation.fulfilled,(state,action)=> {
            state.isPendingPutLocation = false
            state.postLocation1 = action.payload
        })
        .addCase(postLocation.rejected,(state,action)=> {
            state.isPendingPutLocation = false
            state.errpostLocation = action.payload
        })
        // searchLocation
        .addCase(searchLocation.pending,(state,action)=> {
            state.isPendingSearchLocation = true
        })
        .addCase(searchLocation.fulfilled,(state,action)=> {
            state.isPendingSearchLocation = false
            state.searchLocation1 = action.payload
        })
        .addCase(searchLocation.rejected,(state,action)=> {
            state.isPendingSearchLocation = false
            state.searchLocation1 = null
            state.errsearchLocation = action.payload
        })
    }
})

// get Location List
export const getLocation = createAsyncThunk('getLocation', async(data,{rejectWithValue})=> {
try{
    const res = await locationService.getLocation()
    return res.data.content
}catch(err){
    return rejectWithValue(err.response.data.content)
}
})
// getLocationById
export const getLocationById = createAsyncThunk('getLocationById', async(data,{rejectWithValue})=> {
try{
    const res = await locationService.getLocationById(data)
    return res.data.content
}catch(err){
    return rejectWithValue(err.response.data.content)
}
})
// deleteLocation
export const deleteLocation = createAsyncThunk('deleteLocation', async(data,{dispatch,rejectWithValue})=> {
try{
    const res = await locationService.deleteLocation(data)
    dispatch(getLocation())
    return res.data.content
}catch(err){
    return rejectWithValue(err.response.data.content)
}
})
// putLocation
export const putLocation = createAsyncThunk('putLocation', async(data,{dispatch,rejectWithValue})=> {
try{
    const res = await locationService.putLocation(data)
   
    return res.data.content
}catch(err){
    return rejectWithValue(err.response.data.content)
}
})
// postLocation
export const postLocation = createAsyncThunk('postLocation', async(data,{dispatch,rejectWithValue})=> {
try{
    const res = await locationService.postLocation(data)
    dispatch(getLocation())
    return res.data.content
}catch(err){
   
    return rejectWithValue(err.response.data.content)
}
})
//searchLocation
export const searchLocation = createAsyncThunk('searchLocation', async(data,{dispatch,rejectWithValue})=> {
try{
    
    const res = await locationService.searchLocation(data)
      
    return res.data.content.data
}catch(err){
    
   
    return rejectWithValue(err.response.data.content)
}
})