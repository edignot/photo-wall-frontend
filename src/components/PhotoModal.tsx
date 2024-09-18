import React, { useState, useRef } from 'react'
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
    const [photoUploading, setPhotoUploading] = useState(false)
    const photoInputRef = useRef<HTMLInputElement>(null)

    const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNote(event?.target.value)
    }

    const handlePhotoUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const photo = event.target.files?.[0]
        if (!photo) {
            return
        }

        setPhotoUploading(true)
        const photoUrl = await uploadPhoto(photo)
        setUrl(photoUrl)
        setPhotoUploading(false)
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
            <button
                className='upload-photo-button'
                onClick={() => photoInputRef.current.click()}
            />
            <input
                type='file'
                ref={photoInputRef}
                style={{ display: 'none' }}
            />

            <form onSubmit={handleCreatePhoto}>
                <input type='file' onChange={handlePhotoUpload} />

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
