import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../state/store'
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

    const [isDeleteMode, setDeleteMode] = useState<boolean>(false)

    const handleDeletePhoto = (): void => {
        setDeleteMode(!isDeleteMode)
    }

    const handleConfirmDelete = async (): Promise<void> => {
        try {
            const response = await dispatch(deletePhoto(photo._id))
            console.log('Deleted photo', response)
        } catch (error) {
            console.error('Error deleting photo:', error)
        }

        setDeleteMode(false)
    }

    const handleUpdateNote = async (
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
            {!isDeleteMode ? (
                <>
                    <div className='photo-container'>
                        <button
                            className='delete-photo-btn'
                            onClick={handleDeletePhoto}
                        >
                            <IoMdClose />
                        </button>
                        <img src={photo.photoUrl} alt='photo card image' />
                    </div>

                    <EditableNote
                        note={photo.note}
                        editNote={handleUpdateNote}
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
