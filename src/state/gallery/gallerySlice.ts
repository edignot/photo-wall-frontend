import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    getDbPhotos,
    getDbPhoto,
    createDbPhoto,
    updateDbPhoto,
    deleteDbPhoto,
} from './api'

interface GalleryState {
    photos: Photo[]
    selectedPhoto: Photo | null
    loading: boolean
    error: string | null
}

interface Photo {
    _id: string
    note: string
    photoUrl: string
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
        selectPhoto: (state, action: PayloadAction<string>) => {
            const photoId = action.payload

            const foundPhoto = state.photos.find(
                (photo: Photo) => photo._id === photoId
            )

            state.selectedPhoto = foundPhoto ? foundPhoto : null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPhotos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPhotos.fulfilled, (state, action) => {
                state.loading = false
                state.photos = action.payload
            })
            .addCase(getPhotos.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message as string | null
            })

        builder
            .addCase(getPhoto.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPhoto.fulfilled, (state, action) => {
                state.loading = false
                state.selectedPhoto = action.payload
            })
            .addCase(getPhoto.rejected, (state, action) => {
                state.loading = false
                state.error = (action.error?.message as string) || null
            })

        builder
            .addCase(createPhoto.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createPhoto.fulfilled, (state, action) => {
                state.loading = false
                state.photos.push(action.payload)
            })
            .addCase(createPhoto.rejected, (state, action) => {
                state.loading = false
                state.error = (action.error?.message as string) || null
            })

        builder
            .addCase(updatePhoto.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updatePhoto.fulfilled, (state, action) => {
                state.loading = false
                const index = state.photos.findIndex(
                    (photo) => photo._id === action.payload._id
                )
                if (index !== -1) {
                    state.photos[index] = action.payload
                }
            })
            .addCase(updatePhoto.rejected, (state, action) => {
                state.loading = false
                state.error = (action.error?.message as string) || null
            })

        builder
            .addCase(deletePhoto.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                deletePhoto.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false

                    console.log('deleted from db', action.payload)
                    const index = state.photos.findIndex(
                        (photo) => photo._id === action.payload
                    )

                    if (index !== -1) {
                        state.photos.splice(index, 1)
                        if (
                            state.selectedPhoto &&
                            state.selectedPhoto._id === action.payload
                        ) {
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
