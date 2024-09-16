interface Image {
    photoUrl: string
    note?: string
}

const ImageCard = ({ image }: { image: Image }) => {
    return (
        <div className='image-card'>
            <img src={image.photoUrl} alt='Gallery Image' />
            {image.note && <p>Note: {image.note}</p>}
        </div>
    )
}

export default ImageCard
