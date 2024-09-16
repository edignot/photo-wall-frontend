import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../state/store'
import { getImages, getImage } from '../state/gallery/gallerySlice'
import ImageCard from '../components/ImageCard'

const Gallery = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { images, loading, error } = useSelector(
        (state: RootState) => state.gallery
    )

    const handleClick = async () => {
        try {
            const response = await dispatch(getImages())
            console.log('Fetched Images:', response)
        } catch (error) {
            console.error('Error fetching images:', error)
        }
    }

    const handleClickOne = async () => {
        try {
            const response = await dispatch(
                getImage('66e7754974319f510e39d50b')
            )
            alert('got it! ')
            console.log('Fetched Images:', response)
        } catch (error) {
            console.error('Error fetching images:', error)
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Get Images</button>
            <button onClick={handleClickOne}>Get Image</button>
            {loading && <p>Loading images...</p>}
            {error && <p>Error fetching images!</p>}
            {images.length > 0 && (
                <ul>
                    {images.map((image) => (
                        <li key={image.id}>
                            <ImageCard image={image} />{' '}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Gallery
