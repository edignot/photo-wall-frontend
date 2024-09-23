import React, { useState, useRef } from 'react'
import { uploadPhoto } from '../api/cloudinary'
import { IoMdClose } from 'react-icons/io'
import { AiOutlineLoading } from 'react-icons/ai'

interface PhotoUploadProps {
    url?: string
    setUrl: (url: string) => void
}

const PhotoUpload = ({ url, setUrl }: PhotoUploadProps) => {
    const [photoUploading, setPhotoUploading] = useState<boolean>(false)
    const photoInputRef = useRef<HTMLInputElement>(null)

    const handlePhotoUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        const photo = event.target.files?.[0]
        if (!photo) {
            return
        }

        try {
            setPhotoUploading(true)
            const photoUrl = await uploadPhoto(photo)
            setUrl(photoUrl)
        } catch (error) {
            console.error('Error uploading photo:', error)
        } finally {
            setPhotoUploading(false)
        }
    }

    return (
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
    )
}

export default PhotoUpload
