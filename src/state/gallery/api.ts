import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

export const getPhotos = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/photos`)

        return response.data.photos
    } catch (error) {
        console.error('Error fetching photos:', error)
        throw error
    }
}

export const getPhoto = async (photoId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/photos/${photoId}`)

        return response.data.data
    } catch (error) {
        console.error('Error fetching photos:', error)
        throw error
    }
}

export const createPhoto = async (photoData: {
    photoUrl: string
    note?: string
}) => {
    try {
        const response = await axios.post(`${BASE_URL}/photos`, photoData)

        return response.data.data
    } catch (error) {
        console.error('Error creating photo:', error)
        throw error
    }
}

export const updatePhoto = async (photoData: {
    photoId: string
    note?: string
}) => {
    try {
        const response = await axios.patch(
            `${BASE_URL}/photos/${photoData.photoId}`,
            photoData
        )

        return response.data.data
    } catch (error) {
        console.error('Error updating photo:', error)
        throw error
    }
}

export const deletePhoto = async (photoId: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/photos/${photoId}`)

        return response.data
    } catch (error) {
        console.error('Error deleting  photo:', error)
        throw error
    }
}
