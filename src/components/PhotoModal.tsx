import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../state/store'
import { createPhoto } from '../state/gallery/gallerySlice'
import { uploadPhoto } from '../api/cloudinary'
import { IoMdClose, IoMdAdd } from 'react-icons/io'
import { AiOutlineLoading } from 'react-icons/ai'

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
            await dispatch(createPhoto({ photoUrl: url, note: note }))
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
                            className='select-photo-button'
                            onClick={() => photoInputRef.current?.click()}
                        />
                        <input
                            type='file'
                            ref={photoInputRef}
                            style={{ display: 'none' }}
                            onChange={handlePhotoUpload}
                        />
                    </>
                )}
                {photoUploading && (
                    <AiOutlineLoading className='upload-photo-loading' />
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

                <div className='upload-photo-controls'>
                    <button className='cancel-photo-button' onClick={onClose}>
                        <IoMdClose />
                    </button>
                    <button
                        className='upload-photo-button'
                        type='submit'
                        disabled={!url}
                    >
                        <IoMdAdd />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PhotoModal
