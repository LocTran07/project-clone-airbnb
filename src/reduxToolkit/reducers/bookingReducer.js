
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookingService } from "../../service/bookingService";

import { roomService } from "../../service/roomService";



export const { reducer: bookingReducer, actions: bookingAction } = createSlice({
    name: 'room',
    initialState: {
        isPendingBookingByUserId: false, bookingByUserId: [], errBookingByUserId: null,
        isPendingBookingList: false, bookingList: [], errBookingList: null,
        isPendingPostBooking: false, postBooking: null, errPostBooking: null,
        isPendingGetBookingById: false, getBookingById1: null, errGetBookingById1: null,
        isPendingPutBooking: false, putBooking: null, errPutBooking: null,
        isPendingDeleteBooking: false, deleteBooking: null, errDeleteBooking: null,
    },
    reducers: {
        resetPostBooking: (state, payload) => {
            state.postBooking = null
            state.errPostBooking = null
        }
    },
    extraReducers: (builder) => {
        builder
            // getBookingByUserId
            .addCase(getBookingByUserId.pending, (state, action) => {
                state.isPendingBookingByUserId = true
            })
            .addCase(getBookingByUserId.fulfilled, (state, action) => {
                state.isPendingBookingByUserId = false
                state.bookingByUserId = action.payload
            })
            .addCase(getBookingByUserId.rejected, (state, action) => {
                state.isPendingBookingByUserId = false
                state.errBookingByUserId = action.payload
            })
            // getBookingList
            .addCase(getBookingList.pending, (state, action) => {
                state.isPendingBookingList = true
            })
            .addCase(getBookingList.fulfilled, (state, action) => {
                state.isPendingBookingList = false
                state.bookingList = action.payload
            })
            .addCase(getBookingList.rejected, (state, action) => {
                state.isPendingBookingList = false
                state.errBookingList = action.payload
            })

            // postBooking
            .addCase(postBooking1.pending, (state, action) => {
                state.isPendingPostBooking = true
            })
            .addCase(postBooking1.fulfilled, (state, action) => {
                state.isPendingPostBooking = false
                state.postBooking = action.payload
            })
            .addCase(postBooking1.rejected, (state, action) => {
                state.isPendingPostBooking = false
                state.errPostBooking = action.payload
            })
            // getBookingById
            .addCase(getBookingById.pending, (state, action) => {
                state.isPendingGetBookingById = true
            })
            .addCase(getBookingById.fulfilled, (state, action) => {
                state.isPendingGetBookingById = false
                state.getBookingById1 = action.payload
            })
            .addCase(getBookingById.rejected, (state, action) => {
                state.isPendingGetBookingById = false
                state.errGetBookingById1 = action.payload
            })
            // putBooking
            .addCase(putBooking.pending, (state, action) => {
                state.isPendingPutBooking = true
            })
            .addCase(putBooking.fulfilled, (state, action) => {
                state.putBooking = false
                state.putBooking = action.payload
            })
            .addCase(putBooking.rejected, (state, action) => {
                state.isPendingGetBookingById = false
                state.errPutBooking = action.payload
            })
            // deleteBooking
            .addCase(deleteBooking.pending, (state, action) => {
                state.isPendingDeleteBooking = true
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.isPendingDeleteBooking = false
                state.deleteBooking = action.payload
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.isPendingDeleteBooking = false
                state.errDeleteBooking = action.payload
            })
    }
})

// getBookingByUserId
export const getBookingByUserId = createAsyncThunk('getBookingByUserId', async (data, { rejectWithValue }) => {
    try {

        const res = await bookingService.getBookingByUserId(data)

        return res.data.content
    } catch (err) {
        console.log(err.response.data.content);
        return rejectWithValue(err.response.data.content)
    }
})
// getBookingList
export const getBookingList = createAsyncThunk('getBookingList', async (_, { rejectWithValue }) => {
    try {

        const res = await bookingService.getBookingList()

        return res.data.content
    } catch (err) {

        return rejectWithValue(err.response.data.content)
    }
})
// postBooking
export const postBooking1 = createAsyncThunk('postBooking', async (data, { rejectWithValue }) => {
    try {

        const res = await bookingService.postBooking(data)
        console.log(res);
        return res.data.content
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data.content)
    }
})
// getBookingById
export const getBookingById = createAsyncThunk('getBookingById', async (data, { rejectWithValue }) => {
    try {

        const res = await bookingService.getBookingById(data)
        console.log(res);
        return res.data.content
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data.content)
    }
})
// putBooking
export const putBooking = createAsyncThunk('putBooking', async (data, { rejectWithValue }) => {
    try {

        const res = await bookingService.putBooking(data)

        return res.data.content
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data.content)
    }
})
// deleteBooking
export const deleteBooking = createAsyncThunk('deleteBooking', async (data, { dispatch, rejectWithValue }) => {
    try {

        const res = await bookingService.deleteBooking(data)
        dispatch(getBookingList())
        return res.data.content
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data.content)
    }
})