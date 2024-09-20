import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../state/store'
import { deletePhoto, updatePhoto } from '../state/gallery/gallerySlice'
import { IoMdClose } from 'react-icons/io'
import ActionButtons from './ActionButtons'
import EditableNote from './EditableNote'

interface Photo {
    photoUrl: string
    note?: string
    _id: string
}

const PhotoCard = ({ photo }: { photo: Photo }) => {
    const dispatch = useDispatch<AppDispatch>()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleDeletePhoto = (): void => {
        setIsModalOpen((prevState) => !prevState)
    }

    const handleConfirmDelete = async (): Promise<void> => {
        try {
            const response = await dispatch(deletePhoto(photo._id))
            console.log('Deleted photo', response)
        } catch (error) {
            console.error('Error deleting photo:', error)
        }

        setIsModalOpen(false)
    }

    const handleUpdatePhoto = async (
        editedNote: string | undefined
    ): Promise<void> => {
        try {
            const response = await dispatch(
                updatePhoto({
                    photoId: photo._id,
                    note: editedNote,
                })
            )
            console.log('Updated photo', response)
        } catch (error) {
            console.error('Error updating photo:', error)
        }
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

                    <EditableNote
                        note={photo.note}
                        editNote={handleUpdatePhoto}
                    />
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
