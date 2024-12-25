import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { http } from '../../config/api.ts';
import { deserialize } from '../../utils/general.ts';
// import { UrlParamsDataProps } from '../../interface/search/search.interface.ts';
import { MediaInitialStateProps } from '../../interface/redux/media.interface.ts';

export const getUploadUrl = createAsyncThunk('media/getUploadUrl', async ({type, modelId}:{ modelId: string, type: string }, {rejectWithValue}) => {
    try {
        const response = await http.get(`/media/upload-url/${type}?id=${modelId}`)
        if (response.data === null) return rejectWithValue(response?.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const createMedia = createAsyncThunk('media/createMedia', async (data: any, {rejectWithValue}) => {
    try {
        const response = await http.post(`/media`, data)
        if (response.data === null) return rejectWithValue(response?.data)
        return await deserialize(response.data)
    } catch (error) {
        return rejectWithValue(error)
    }
});

const initialState: MediaInitialStateProps = {
    media: null,
    uploadData: {
        id: '',
        uploadUrl: '',
        expires: 0
    },
    loading: false,
}

const reducers = {}

export const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: reducers,
    extraReducers: (builder) => {
        builder.addCase(getUploadUrl.fulfilled, (state: MediaInitialStateProps, action) => {
            state.uploadData = action.payload
            state.loading = false
        })
        builder.addCase(getUploadUrl.pending, (state: MediaInitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getUploadUrl.rejected, (state: MediaInitialStateProps, action) => {
            state.media = null
            state.loading = false
            console.error(action.payload)
        })

        builder.addCase(createMedia.fulfilled, (state: MediaInitialStateProps, action) => {
            state.media = action.payload
            state.loading = false
        })
        builder.addCase(createMedia.pending, (state: MediaInitialStateProps) => {
            state.loading = true
        })
        builder.addCase(createMedia.rejected, (state: MediaInitialStateProps, action) => {
            state.media = null
            state.loading = false
            console.error(action.payload)
        })
    }
})

export const {} = mediaSlice.actions;
export default mediaSlice.reducer