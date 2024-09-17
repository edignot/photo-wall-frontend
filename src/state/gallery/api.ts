import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

export const getDbPhotos = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/photos`)

        return response.data.photos
    } catch (error) {
        console.error('Error fetching photos:', error)
        throw error
    }
}

export const getDbPhoto = async (photoId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/photos/${photoId}`)

        return response.data.data
    } catch (error) {
        console.error('Error fetching photos:', error)
        throw error
    }
}

export const createDbPhoto = async (photoData: {
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

export const updateDbPhoto = async (photoData: {
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

export const deleteDbPhoto = async (photoId: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/photos/${photoId}`)

        return response.data
    } catch (error) {
        console.error('Error deleting  photo:', error)
        throw error
    }
}
