import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    getPhotos,
    getPhoto,
    createPhoto,
    updatePhoto,
    deletePhoto,
} from './api'

interface GalleryState {
    images: string[]
    selectedImage: string | null
    loading: boolean
    error: string | null
}

const initialState: GalleryState = {
    images: [],
    selectedImage: null,
    loading: false,
    error: null,
}

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        // select image
        selectImage: (state, action: PayloadAction<string>) => {
            state.selectedImage = action.payload
        },
    },
    extraReducers: (builder) => {
        // Get all images
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

        // Get image by id (for cases if initial state does not include all image details )
        builder
            .addCase(getImage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                getImage.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false
                    state.selectedImage = action.payload
                }
            )
            .addCase(getImage.rejected, (state, action) => {
                state.loading = false
                state.error = (action.error?.message as string) || null
            })

        // create image
        builder
            .addCase(createImage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                createImage.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false
                    state.images.push(action.payload)
                }
            )
            .addCase(createImage.rejected, (state, action) => {
                state.loading = false
                state.error = (action.error?.message as string) || null
            })

        // update image
        builder
            .addCase(updateImage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                updateImage.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false
                    const index = state.images.findIndex(
                        (id) => id === action.payload
                    )
                    if (index !== -1) {
                        state.images[index] = action.payload // Update photo in images
                    }
                }
            )
            .addCase(updateImage.rejected, (state, action) => {
                state.loading = false
                state.error = (action.error?.message as string) || null
            })

        // Delete photo
        builder
            .addCase(deleteImage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                deleteImage.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false
                    const index = state.images.findIndex(
                        (id) => id === action.payload
                    )
                    if (index !== -1) {
                        state.images.splice(index, 1)
                        if (state.selectedImage === action.payload) {
                            state.selectedImage = null
                        }
                    }
                }
            )
            .addCase(deleteImage.rejected, (state, action) => {
                state.loading = false
                state.error = (action.error?.message as string) || null
            })
    },
})

export const getImages = createAsyncThunk('gallery/getImages', async () => {
    const photos = await getPhotos()
    return photos
})

export const getImage = createAsyncThunk(
    'gallery/getImage',
    async (photoId: string) => {
        const photo = await getPhoto(photoId)
        return photo
    }
)

export const createImage = createAsyncThunk(
    'gallery/createPhoto',
    async (photoData: { photoUrl: string; note?: string }) => {
        const photo = await createPhoto(photoData)
        return photo
    }
)

export const updateImage = createAsyncThunk(
    'gallery/updatePhoto',
    async (photoData: { photoId: string; note?: string }) => {
        const photo = await updatePhoto(photoData)
        return photo
    }
)

export const deleteImage = createAsyncThunk(
    'gallery/deletePhoto',
    async (photoId: string) => {
        await deletePhoto(photoId)
        return photoId
    }
)

export const { selectImage } = gallerySlice.actions

export default gallerySlice.reducer
