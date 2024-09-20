import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../state/store'
import { getPhotos } from '../state/gallery/gallerySlice'
import GalleryActions from '../components/GalleryActions'
import PhotoCard from '../components/PhotoCard'
import PhotoModal from '../components/PhotoModal'

const Gallery = () => {
    const dispatch = useDispatch<AppDispatch>()

    const { photos, loading, error } = useSelector(
        (state: RootState) => state.gallery
    )

    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    const [isPhotoModalOpen, setPhotoModalOpen] = useState<boolean>(false)

    useEffect(() => {
        const galleryContainer =
            document.querySelector<Element>('.gallery-container')
        if (isPhotoModalOpen) {
            galleryContainer?.classList.add('photo-modal-open')
        } else {
            galleryContainer?.classList.remove('photo-modal-open')
        }
    }, [isPhotoModalOpen])

    const handleTakePhoto = (): void => {
        setPhotoModalOpen(!isPhotoModalOpen)
    }

    return (
        <>
            <div className='gallery-container'>
                <GalleryActions />
                {/* <div className='gallery-actions'>
                    <button
                        className='take-photo-btn'
                        onClick={handleTakePhoto}
                    >
                        <img
                            src='../../src/assets/camera-icon.png'
                            alt='take photo'
                        />
                    </button>
                </div> */}
                {loading && <p>Loading photos...</p>}
                {error && <p>Error fetching photos!</p>}
                {photos.length > 0 && (
                    <ul className='photo-grid'>
                        {photos
                            .slice()
                            .reverse()
                            .map((photo) => {
                                return (
                                    <li
                                        key={photo._id}
                                        className='photo-grid-item'
                                    >
                                        <PhotoCard photo={photo} />
                                    </li>
                                )
                            })}
                    </ul>
                )}
            </div>
            {isPhotoModalOpen && <PhotoModal onClose={handleTakePhoto} />}
        </>
    )
}

export default Gallery
