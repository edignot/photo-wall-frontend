import { IoMdClose } from 'react-icons/io'

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
    return (
        <>
            <div className='photo-container'>
                <button
                    className='delete-photo-button'
                    onClick={() => onDeletePhoto(photo._id)}
                >
                    <IoMdClose />
                </button>
                <img src={photo.photoUrl} alt='gallery photo' />
            </div>
            {photo.note && <p className='photo-card-note'>{photo.note}</p>}
        </>
    )
}

export default PhotoCard
