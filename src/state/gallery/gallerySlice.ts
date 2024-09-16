import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getPhotos } from './api'

interface GalleryState {
    images: string[]
    loading: boolean
    error: string | null
}

const initialState: GalleryState = {
    images: [],
    loading: false,
    error: null,
}

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getImages.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                getImages.fulfilled,
                (state, action: PayloadAction<string[]>) => {
                    state.loading = false
                    state.images = action.payload
                }
            )
            .addCase(getImages.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message as string | null
            })
    },
})

export const getImages = createAsyncThunk('gallery/getImages', async () => {
    const photos = await getPhotos()
    return photos
})

export default gallerySlice.reducer
