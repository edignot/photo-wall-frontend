import { IoMdClose, IoMdCheckmark } from 'react-icons/io'

interface PhotoConfirmationModalProps {
    onClose: () => void
    onConfirm: () => void
}

const PhotoConfirmationModal = ({
    onClose,
    onConfirm,
}: PhotoConfirmationModalProps) => {
    return (
        <div className='photo-confirmation-modal'>
            <p className='confirm-modal-note'>Delete photo?</p>
            <div className=''>
                <button className='cancel-button' onClick={onClose}>
                    <IoMdClose />
                </button>
                <button className='confirm-button' onClick={onConfirm}>
                    <IoMdCheckmark />
                </button>
            </div>
        </div>
    )
}

export default PhotoConfirmationModal
