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
            <p>Delete? </p>
            <button className='' onClick={onClose}>
                <IoMdClose />
            </button>
            <button className='' onClick={onConfirm}>
                <IoMdCheckmark />
            </button>
        </div>
    )
}

export default PhotoConfirmationModal
