import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../state/store'
import { createPhoto } from '../state/gallery/gallerySlice'
import ActionButtons from './ActionButtons'
import { uploadPhoto } from '../api/cloudinary'
import { IoMdClose } from 'react-icons/io'
import { AiOutlineLoading } from 'react-icons/ai'

const PhotoModal = ({ onClose }: { onClose: () => void }) => {
    const dispatch = useDispatch<AppDispatch>()

    const [note, setNote] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const [photoUploading, setPhotoUploading] = useState<boolean>(false)
    const photoInputRef = useRef<HTMLInputElement>(null)

    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNote(e?.target.value)
    }

    const handlePhotoUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        const photo = e.target.files?.[0]
        if (!photo) {
            return
        }

        setPhotoUploading(true)
        const photoUrl = await uploadPhoto(photo)
        setUrl(photoUrl)
        setPhotoUploading(false)
    }

    const handleCreatePhoto = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault()

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
                            className='select-photo-btn'
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
                {url && (
                    <>
                        <img src={url} alt='uploaded photo' />
                        <button
                            className='remove-photo-btn'
                            onClick={() => setUrl('')}
                        >
                            <IoMdClose />
                        </button>
                    </>
                )}
            </div>

            <form onSubmit={handleCreatePhoto}>
                <input
                    type='text'
                    className='photo-note'
                    value={note}
                    placeholder='add note'
                    maxLength={50}
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
