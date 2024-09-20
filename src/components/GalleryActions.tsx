const GalleryActions = ({ takePhoto }: { takePhoto: () => void }) => {
    return (
        <div className='gallery-actions'>
            <button className='take-photo-btn' onClick={takePhoto}>
                <img src='../../src/assets/camera-icon.png' alt='take photo' />
            </button>
        </div>
    )
}

export default GalleryActions
