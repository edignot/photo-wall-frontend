import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import PhotoConfirmationModal from './PhotoConfirmationModal'

interface Photo {
    photoUrl: string
    note?: string
    _id: string
}

interface PhotoCardProps {
    photo: Photo
    onDeletePhoto: (photoId: string) => void
}

const PhotoCard = ({ photo, onDeletePhoto }: PhotoCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleDeletePhoto = () => {
        setIsModalOpen((prevState) => !prevState)
    }

    const handleConfirmDelete = () => {
        onDeletePhoto(photo._id)
        setIsModalOpen(false)
    }

    return (
        <>
            {!isModalOpen ? (
                <>
                    <div className='photo-container'>
                        <button
                            className='delete-photo-button'
                            onClick={handleDeletePhoto}
                        >
                            <IoMdClose />
                        </button>
                        <img src={photo.photoUrl} alt='gallery photo' />
                    </div>
                    {photo.note && (
                        <p className='photo-card-note'>{photo.note}</p>
                    )}
                </>
            ) : (
                <PhotoConfirmationModal
                    onClose={handleDeletePhoto}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </>
    )
}

export default PhotoCard
