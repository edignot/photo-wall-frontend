import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GalleryState {
    value: number
}

const initialState: GalleryState = {
    value: 0,
}

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getImages.pending, () => {
                console.log('getImagesAsync.pending')
            })
            .addCase(
                getImages.fulfilled,
                (state, action: PayloadAction<number>) => {
                    state.value += action.payload
                }
            )
    },
})

export const getImages = createAsyncThunk(
    'gallery/getImages',
    async (amount: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return amount
    }
)

export const { increment, incrementByAmount } = gallerySlice.actions

export default gallerySlice.reducer
