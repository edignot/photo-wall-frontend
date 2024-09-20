import { IoMdClose } from 'react-icons/io'

interface Photo {
    photoUrl: string
    note?: string
}

const PhotoCard = ({ photo }: { photo: Photo }) => {
    return (
        <>
            <div className='photo-container'>
                <button
                    className='delete-photo-button'
                    onClick={() => alert('hi')}
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
