import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    try {
        const response = await fetch('http://localhost:8000/photos')
        // test a pending request:
        // await new Promise((resolve) => setTimeout(resolve, 2000))

        const data = await response.json()
        return data.photos
    } catch (error: unknown) {
        if (error instanceof Error) {
            return Promise.reject(error.message)
        } else {
            return Promise.reject('An unexpected error occurred.')
        }
    }
})

export default gallerySlice.reducer
