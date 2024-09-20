import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import ActionButtons from './ActionButtons'

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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleDeletePhoto = (): void => {
        setIsModalOpen((prevState) => !prevState)
    }

    const handleConfirmDelete = (): void => {
        onDeletePhoto(photo._id)
        setIsModalOpen(false)
    }

    return (
        <>
            {!isModalOpen ? (
                <>
                    <div className='photo-container'>
                        <button
                            className='delete-photo-btn'
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
                <ActionButtons
                    onCancel={handleDeletePhoto}
                    onConfirm={handleConfirmDelete}
                    note='Delete photo?'
                />
            )}
        </>
    )
}

export default PhotoCard
