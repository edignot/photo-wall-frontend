import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../state/store'
import {
    getPhotos,
    // getPhoto,
    // selectPhoto,
    // createPhoto,
    // updatePhoto,
    // deletePhoto,
} from '../state/gallery/gallerySlice'
import PhotoCard from '../components/PhotoCard'
import PhotoModal from '../components/PhotoModal'

const Gallery = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { photos, selectedPhoto, loading, error } = useSelector(
        (state: RootState) => state.gallery
    )

    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    const [isPhotoModalOpen, setPhotoModalOpen] = useState(false)

    const handleClosePhotoModal = () => {
        setPhotoModalOpen(false)
    }

    const handleTakePhoto = () => {
        setPhotoModalOpen(true)
    }

    return (
        <div className='gallery-container'>
            <div className='gallery-controls'>
                <button
                    className='take-photo-button'
                    onClick={() => handleTakePhoto()}
                >
                    <img
                        src='../../src/assets/camera-icon.png'
                        alt='take photo'
                    />
                </button>
                <button onClick={() => alert('delete')}>Delete Picture</button>
            </div>
            {loading && <p>Loading photos...</p>}
            {error && <p>Error fetching photos!</p>}
            {photos.length > 0 && (
                <ul className='photo-grid'>
                    {photos.map((photo) => {
                        return (
                            <li key={photo._id} className='photo-grid-item'>
                                <PhotoCard photo={photo} />
                            </li>
                        )
                    })}
                </ul>
            )}
            {isPhotoModalOpen && <PhotoModal onClose={handleClosePhotoModal} />}
        </div>
    )
}

export default Gallery

//<button onClick={handleGetPhotos}>Get Photos</button>
//<button onClick={handleGetPhoto}>Get Photo</button>
//<button onClick={handleCreatePhoto}>Create Photo</button>
//<button onClick={handleSelectPhoto}>Select Photo</button>
//<button onClick={handleUpdatePhoto}>Update Photo</button>
//<button onClick={handleDeletePhoto}>Delete Photo</button>

// const handleGetPhoto = async () => {
//     try {
//         const response = await dispatch(getPhoto('66e996575a846bc4f3089bcf'))
//         console.log('Photo', response)
//     } catch (error) {
//         console.error('Error getting photo:', error)
//     }
// }

// const handleCreatePhoto = async () => {
//     try {
//         const response = await dispatch(
//             createPhoto({ photoUrl: 'test', note: 'test' })
//         )
//         console.log('Created photo', response)
//     } catch (error) {
//         console.error('Error creating photo:', error)
//     }
// }

// const handleSelectPhoto = () => {
//     dispatch(selectPhoto('66e9a0b05a846bc4f3089c42'))
// }

// const handleUpdatePhoto = async () => {
//     try {
//         const response = await dispatch(
//             updatePhoto({
//                 photoId: '66e9a0b05a846bc4f3089c42',
//                 note: 'updating',
//             })
//         )
//         console.log('Updated photo', response)
//     } catch (error) {
//         console.error('Error updating photo:', error)
//     }
// }

// const handleDeletePhoto = async () => {
//     try {
//         const response = await dispatch(
//             deletePhoto('66e9a0b05a846bc4f3089c42')
//         )
//         console.log('Deleted photo', response)
//     } catch (error) {
//         console.error('Error deleting photo:', error)
//     }
// }
