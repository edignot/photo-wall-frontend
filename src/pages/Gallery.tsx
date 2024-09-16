import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../state/store'
import { getImages } from '../state/gallery/gallerySlice'

const Gallery = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { images, error } = useSelector((state: RootState) => state.gallery)

    const handleClick = async () => {
        try {
            const response = await dispatch(getImages())
            console.log('Fetched Images:', response)
        } catch (error) {
            console.error('Error fetching images:', error)
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Get Images</button>
            {error && <p>Error: {error}</p>}
            {images.length > 0 && (
                <ul>
                    {images.map((image) => (
                        <li key={image.id}>
                            <p>Note: {image.note}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Gallery
