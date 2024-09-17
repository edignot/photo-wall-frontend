interface Photo {
    photoUrl: string
    note?: string
}

const PhotoCard = ({ photo }: { photo: Photo }) => {
    return (
        <div className='photo-card'>
            <img src={photo.photoUrl} alt='Gallery Image' />
            {photo.note && <p>Note: {photo.note}</p>}
        </div>
    )
}

export default PhotoCard
