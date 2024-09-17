import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../state/store'
import {
    getPhotos,
    getPhoto,
    selectPhoto,
    createPhoto,
    updatePhoto,
    deletePhoto,
} from '../state/gallery/gallerySlice'
import PhotoCard from '../components/PhotoCard'

const Gallery = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { photos, selectedPhoto, loading, error } = useSelector(
        (state: RootState) => state.gallery
    )

    const handleGetPhotos = async () => {
        try {
            const response = await dispatch(getPhotos())
            console.log('Photos', response)
        } catch (error) {
            console.error('Error getting photos:', error)
        }
    }

    const handleGetPhoto = async () => {
        try {
            const response = await dispatch(
                getPhoto('66e7754974319f510e39d50b')
            )
            console.log('Photo', response)
        } catch (error) {
            console.error('Error getting photo:', error)
        }
    }

    const handleSelectPhoto = () => {
        dispatch(selectPhoto('66e7754974319f510e39d50b'))
        console.log('Selected photo', selectedPhoto)
    }

    const handleCreatePhoto = async () => {
        try {
            const response = await dispatch(
                createPhoto({ photoUrl: 'test', note: 'test' })
            )
            console.log('Created photo', response)
        } catch (error) {
            console.error('Error creating photo:', error)
        }
    }

    const handleUpdatePhoto = async () => {
        try {
            const response = await dispatch(
                updatePhoto({
                    photoId: '66e7754974319f510e39d50b',
                    note: 'test',
                })
            )
            console.log('Updated photo', response)
        } catch (error) {
            console.error('Error updating photo:', error)
        }
    }

    const handleDeletePhoto = async () => {
        try {
            const response = await dispatch(
                deletePhoto('66e7754974319f510e39d50b')
            )
            console.log('Deleted photo', response)
        } catch (error) {
            console.error('Error deleting photo:', error)
        }
    }

    return (
        <div>
            <button onClick={handleGetPhotos}>Get Photos</button>
            <button onClick={handleGetPhoto}>Get Photo</button>
            <button onClick={handleSelectPhoto}>Select Photo</button>
            <button onClick={handleCreatePhoto}>Create Photo</button>
            <button onClick={handleUpdatePhoto}>Update Photo</button>
            <button onClick={handleDeletePhoto}>Delete Photo</button>
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
