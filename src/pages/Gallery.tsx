import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../state/store'
import { getPhotos, getPhoto } from '../state/gallery/gallerySlice'
import PhotoCard from '../components/PhotoCard'

const Gallery = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { photos, loading, error } = useSelector(
        (state: RootState) => state.gallery
    )

    const handleClick = async () => {
        try {
            const response = await dispatch(getPhotos())
            console.log('Fetched Photos:', response)
        } catch (error) {
            console.error('Error fetching photos:', error)
        }
    }

    const handleClickOne = async () => {
        try {
            const response = await dispatch(
                getPhoto('66e7754974319f510e39d50b')
            )
            alert('got it! ')
            console.log('Fetched Photos:', response)
        } catch (error) {
            console.error('Error fetching photos:', error)
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Get Photos</button>
            <button onClick={handleClickOne}>Get Photo</button>
            {loading && <p>Loading photos...</p>}
            {error && <p>Error fetching photos!</p>}
            {photos.length > 0 && (
                <ul>
                    {photos.map((photo) => (
                        <li key={photo.id}>
                            <PhotoCard photo={photo} />{' '}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Gallery
