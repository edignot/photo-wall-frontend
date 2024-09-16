import { createSlice } from '@reduxjs/toolkit'

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
})

export const { increment, incrementByAmount } = gallerySlice.actions

export default gallerySlice.reducer
