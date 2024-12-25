import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {InitialStateProps} from "../../interface/redux/variable.interface";

import {http} from "../../config/api.ts";
import {deserialize} from "../../utils/general.ts";
import { UrlParamsDataProps } from '../../interface/search/search.interface.ts';

export const getUsers = createAsyncThunk('variables/getUsers', async (data: UrlParamsDataProps, {rejectWithValue}) => {
    try {
        const response = await http.get(`/users`, {
            params: data
        })
        if (response.data === null) return rejectWithValue(response?.data)
        return await deserialize(response.data)
    } catch (error) {
        return rejectWithValue(error)
    }
});

const initialState: InitialStateProps = {
    users: [],

    loading: false,
    currentPage: 1,
    pageCount: 1,
    totalCount: 0,
    limit: 10
}

const reducers = {}

export const variableSlice = createSlice({
    name: 'variable',
    initialState,
    reducers: reducers,
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state: InitialStateProps, action) => {
            state.users = action.payload
            state.loading = false
        })
        builder.addCase(getUsers.pending, (state: InitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getUsers.rejected, (state: InitialStateProps, action) => {
            state.users = []
            state.loading = false
            console.error(action.payload);
        })
    }
})

export const {} = variableSlice.actions;
export default variableSlice.reducer