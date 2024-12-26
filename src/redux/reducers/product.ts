import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { http } from '../../config/api.ts';
import { deserialize } from '../../utils/general.ts';
import { UrlParamsDataProps } from '../../interface/search/search.interface.ts';
import { productDataProps, ProductInitialStateProps } from '../../interface/redux/product.interface.ts';

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

export const getProductById = createAsyncThunk('product/getProductById', async (id: string, {rejectWithValue}) => {
    try {
        const response = await http.get(`/products/${id}`)
        if (response.data === null) return rejectWithValue(response?.data)
        return await deserialize(response.data)
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const createProduct = createAsyncThunk('product/createProduct', async (data: productDataProps, {rejectWithValue}) => {
    try {
        const response = await http.post(`/products`, data)
        if (response.data === null) return rejectWithValue(response?.data)
        return await deserialize(response.data)
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const updateProduct = createAsyncThunk('product/updateProduct', async (data: productDataProps, {rejectWithValue}) => {
    try {
        const response = await http.patch(`/products/${data.id}`, data)
        if (response.data === null) return rejectWithValue(response?.data)
        return await deserialize(response.data)
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: number, {rejectWithValue}) => {
    try {
        const response = await http.delete(`/products/${id}`)
        if (response.data === null) return rejectWithValue(response?.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

const initialState: ProductInitialStateProps = {
    products: [],
    product: null,
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

        builder.addCase(getProductById.fulfilled, (state: ProductInitialStateProps, action) => {
            console.log("action.payload", action.payload);
            state.product = action.payload
            state.loading = false
        })
        builder.addCase(getProductById.pending, (state: ProductInitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getProductById.rejected, (state: ProductInitialStateProps, action) => {
            state.product = null
            state.loading = false
            console.error(action.payload)
        })

        builder.addCase(createProduct.fulfilled, (state: ProductInitialStateProps, action) => {
            state.products = [action.payload, ...state.products]
            state.loading = false
        })
        builder.addCase(createProduct.pending, (state: ProductInitialStateProps) => {
            state.loading = true
        })
        builder.addCase(createProduct.rejected, (state: ProductInitialStateProps, action) => {
            // state.product = null
            state.loading = false
            console.error(action.payload)
        })

        builder.addCase(deleteProduct.fulfilled, (state: ProductInitialStateProps, action) => {
            state.products = state.products.filter(item => item.id !== Number(action.meta.arg));
            state.loading = false
        })
        builder.addCase(deleteProduct.pending, (state: ProductInitialStateProps) => {
            state.loading = true
        })
        builder.addCase(deleteProduct.rejected, (state: ProductInitialStateProps, action) => {
            // state.product = null
            state.loading = false
            console.error(action.payload)
        })
    }
})

export const {} = productSlice.actions;
export default productSlice.reducer