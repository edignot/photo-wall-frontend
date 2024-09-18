interface Photo {
    photoUrl: string
    note?: string
}

const PhotoCard = ({ photo }: { photo: Photo }) => {
    return (
        <div className='photo-card'>
            <img src={photo.photoUrl} alt='gallery photo' />
            {photo.note && <p className='photo-card-note'>{photo.note}</p>}
        </div>
    )
}

export default PhotoCard
