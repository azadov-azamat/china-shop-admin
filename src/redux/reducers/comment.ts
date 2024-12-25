import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {http} from "../../config/api.ts";
import {deserialize} from "../../utils/general.ts";
import { UrlParamsDataProps } from '../../interface/search/search.interface.ts';
import { CommentInitialStateProps } from '../../interface/redux/comment.interface.ts';

export const getComments = createAsyncThunk('comment/getComments', async (data: UrlParamsDataProps, {rejectWithValue}) => {
    try {
        const response = await http.get(`/comments`, {
            params: data
        })
        if (response.data === null) return rejectWithValue(response?.data)
        console.log(response.data);
        return await deserialize(response.data)
    } catch (error) {
        return rejectWithValue(error)
    }
});

const initialState: CommentInitialStateProps = {
    comments: [],
    loading: false,
    currentPage: 1,
    pageCount: 1,
    totalCount: 0,
    limit: 10
}

const reducers = {}

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: reducers,
    extraReducers: (builder) => {
        builder.addCase(getComments.fulfilled, (state: CommentInitialStateProps, action) => {
            console.log(action.payload);
            state.comments = action.payload
            state.loading = false
        })
        builder.addCase(getComments.pending, (state: CommentInitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getComments.rejected, (state: CommentInitialStateProps, action) => {
            state.comments = []
            console.error(action.payload)
            state.loading = false
        })
    }
})

export const {} = commentSlice.actions;
export default commentSlice.reducer