import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../state/store'
import { createPhoto } from '../state/gallery/gallerySlice'
import { uploadPhoto } from '../api/cloudinary'

interface PhotoModalProps {
    onClose: () => void
}

const PhotoModal: React.FC<PhotoModalProps> = ({ onClose }) => {
    const dispatch = useDispatch<AppDispatch>()

    const [note, setNote] = useState('')
    const [url, setUrl] = useState('')

    const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNote(event?.target.value)
    }

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event?.target.value)
    }

    const handlePhotoUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const photo = event.target.files[0]
        if (!photo) {
            return
        }

        uploadPhoto(photo)
    }

    const handleCreatePhoto = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        try {
            const response = await dispatch(
                createPhoto({ photoUrl: url, note: note })
            )
            console.log('Created photo', response)
        } catch (error) {
            console.error('Error creating photo:', error)
        }
        onClose()
    }

    return (
        <div className='photo-modal'>
            <form onSubmit={handleCreatePhoto}>
                <input type='file' onChange={handlePhotoUpload} />
                <label htmlFor='photo-url'>Photo URL:</label>
                <input
                    type='text'
                    id='photo-url'
                    value={url}
                    onChange={handleUrlChange}
                    required
                />

                <label htmlFor='photo-note'>Note:</label>
                <input
                    type='text'
                    id='photo-note'
                    value={note}
                    onChange={handleNoteChange}
                />

                <button type='submit'>Create Photo</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default PhotoModal
