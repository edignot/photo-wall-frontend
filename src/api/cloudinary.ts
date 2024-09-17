import axios from 'axios'

export const uploadPhoto = async (photoFile: File) => {
    const photoData = new FormData()
    photoData.append('file', photoFile)
    photoData.append('upload_preset', 'photo-wall')
    photoData.append('cloud_name', 'ds6dxgvxo')

    try {
        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/ds6dxgvxo/image/upload',
            photoData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )

        return response.data.url
    } catch (error) {
        console.error('Error uploading photo:', error)
        throw error
    }
}
