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

    const [note, setNote] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const [photoUploading, setPhotoUploading] = useState<boolean>(false)
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
            <div className='upload-photo-container'>
                {!photoUploading && !url && (
                    <>
                        <button
                            className='upload-photo-button'
                            onClick={() => photoInputRef.current.click()}
                        />
                        <input
                            type='file'
                            ref={photoInputRef}
                            style={{ display: 'none' }}
                            onChange={handlePhotoUpload}
                        />
                    </>
                )}
                {url && <img src={url} alt='uploaded photo' />}
            </div>

            <form onSubmit={handleCreatePhoto}>
                <input
                    type='text'
                    id='photo-note'
                    value={note}
                    placeholder='add note'
                    maxLength={40}
                    onChange={handleNoteChange}
                />

                <div>
                    <button onClick={onClose}>Close</button>
                    <button type='submit'>Create Photo</button>
                </div>
            </form>
        </div>
    )
}

export default PhotoModal
