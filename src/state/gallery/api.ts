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
