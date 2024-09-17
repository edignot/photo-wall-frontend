import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    getDbPhotos,
    getDbPhoto,
    createDbPhoto,
    updateDbPhoto,
    deleteDbPhoto,
} from './api'

interface GalleryState {
    photos: string[]
    selectedPhoto: string | null
    loading: boolean
    error: string | null
}

const initialState: GalleryState = {
    photos: [],
    selectedPhoto: null,
    loading: false,
    error: null,
}

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        // select photo
        selectPhoto: (state, action: PayloadAction<string>) => {
            state.selectedPhoto = action.payload
        },
    },
    extraReducers: (builder) => {
        // Get all photos
        builder
            .addCase(getPhotos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                getPhotos.fulfilled,
                (state, action: PayloadAction<string[]>) => {
                    state.loading = false
                    state.photos = action.payload
                }
            )
            .addCase(getPhotos.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message as string | null
            })

        // Get photo by id (for cases if initial state does not include all photo details )
        builder
            .addCase(getPhoto.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                getPhoto.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false
                    state.selectedPhoto = action.payload
                }
            )
            .addCase(getPhoto.rejected, (state, action) => {
                state.loading = false
                state.error = (action.error?.message as string) || null
            })

        // create photo
        builder
            .addCase(createPhoto.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                createPhoto.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false
                    state.photos.push(action.payload)
                }
            )
            .addCase(createPhoto.rejected, (state, action) => {
                state.loading = false
                state.error = (action.error?.message as string) || null
            })

        // update photo
        builder
            .addCase(updatePhoto.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                updatePhoto.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false
                    const index = state.photos.findIndex(
                        (id) => id === action.payload
                    )
                    if (index !== -1) {
                        state.photos[index] = action.payload
                    }
                }
            )
            .addCase(updatePhoto.rejected, (state, action) => {
                state.loading = false
                state.error = (action.error?.message as string) || null
            })

        // Delete photo
        builder
            .addCase(deletePhoto.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                deletePhoto.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false
                    const index = state.photos.findIndex(
                        (id) => id === action.payload
                    )
                    if (index !== -1) {
                        state.photos.splice(index, 1)
                        if (state.selectedPhoto === action.payload) {
                            state.selectedPhoto = null
                        }
                    }
                }
            )
            .addCase(deletePhoto.rejected, (state, action) => {
                state.loading = false
                state.error = (action.error?.message as string) || null
            })
    },
})

export const getPhotos = createAsyncThunk('gallery/getPhotos', async () => {
    const photos = await getDbPhotos()
    return photos
})

export const getPhoto = createAsyncThunk(
    'gallery/getPhoto',
    async (photoId: string) => {
        const photo = await getDbPhoto(photoId)
        return photo
    }
)

export const createPhoto = createAsyncThunk(
    'gallery/createPhoto',
    async (photoData: { photoUrl: string; note?: string }) => {
        const photo = await createDbPhoto(photoData)
        return photo
    }
)

export const updatePhoto = createAsyncThunk(
    'gallery/updatePhoto',
    async (photoData: { photoId: string; note?: string }) => {
        const photo = await updateDbPhoto(photoData)
        return photo
    }
)

export const deletePhoto = createAsyncThunk(
    'gallery/deletePhoto',
    async (photoId: string) => {
        await deleteDbPhoto(photoId)
        return photoId
    }
)

export const { selectPhoto } = gallerySlice.actions

export default gallerySlice.reducer
