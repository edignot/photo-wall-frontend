import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../state/store'
import { createPhoto } from '../state/gallery/gallerySlice'
import PhotoUpload from './PhotoUpload'
import ActionButtons from './ActionButtons'

const PhotoModal = ({ onClose }: { onClose: () => void }) => {
    const dispatch = useDispatch<AppDispatch>()

    const [note, setNote] = useState<string>('')
    const [url, setUrl] = useState<string>('')

    const handleNoteChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setNote(event?.target.value)
    }

    const handleCreatePhoto = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault()

        try {
            await dispatch(createPhoto({ photoUrl: url, note: note }))
        } catch (error) {
            console.error('Error creating photo:', error)
        }
        onClose()
    }

    return (
        <div className='photo-modal'>
            <PhotoUpload setUrl={setUrl} url={url} />

            <form onSubmit={handleCreatePhoto}>
                <input
                    type='text'
                    className='photo-note'
                    value={note}
                    placeholder='add note'
                    maxLength={20}
                    onChange={handleNoteChange}
                />

                <ActionButtons
                    onCancel={onClose}
                    onConfirm={handleCreatePhoto}
                    disabled={!url}
                />
            </form>
        </div>
    )
}

export default PhotoModal
