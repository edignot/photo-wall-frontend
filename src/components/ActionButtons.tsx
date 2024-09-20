import { IoMdClose, IoMdCheckmark } from 'react-icons/io'

interface ActionButtonsProps {
    onCancel: () => void
    onConfirm: () => void
    note?: string
}

const ActionButtons = ({ onCancel, onConfirm, note }: ActionButtonsProps) => {
    return (
        <div className='photo-confirmation-modal'>
            <p className='confirm-modal-note'>{note}</p>
            <div className=''>
                <button className='cancel-btn' onClick={onCancel}>
                    <IoMdClose />
                </button>
                <button className='confirm-btn' onClick={onConfirm}>
                    <IoMdCheckmark />
                </button>
            </div>
        </div>
    )
}

export default ActionButtons
