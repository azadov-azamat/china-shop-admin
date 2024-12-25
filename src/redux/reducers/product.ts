import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {http} from "../../config/api.ts";
import {deserialize} from "../../utils/general.ts";
import { UrlParamsDataProps } from '../../interface/search/search.interface.ts';
import { ProductInitialStateProps } from '../../interface/redux/product.interface.ts';

export const getProducts = createAsyncThunk('product/getProducts', async (data: UrlParamsDataProps, {rejectWithValue}) => {
    try {
        const response = await http.get(`/products`, {
            params: data
        })
        if (response.data === null) return rejectWithValue(response?.data)
        return await deserialize(response.data)
    } catch (error) {
        return rejectWithValue(error)
    }
});

const initialState: ProductInitialStateProps = {
    products: [],
    loading: false,
    currentPage: 1,
    pageCount: 1,
    totalCount: 0,
    limit: 10
}

const reducers = {}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: reducers,
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state: ProductInitialStateProps, action) => {
            state.products = action.payload
            state.loading = false
        })
        builder.addCase(getProducts.pending, (state: ProductInitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getProducts.rejected, (state: ProductInitialStateProps, action) => {
            state.products = []
            state.loading = false
            console.error(action.payload)
        })
    }
})

export const {} = productSlice.actions;
export default productSlice.reducer