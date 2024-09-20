import { IoMdClose, IoMdCheckmark } from 'react-icons/io'

interface ActionButtonsProps {
    onCancel: () => void
    onConfirm: () => void
    note?: string
    disabled?: boolean
}

const ActionButtons = ({
    onCancel,
    onConfirm,
    note,
    disabled,
}: ActionButtonsProps) => {
    return (
        <div>
            <p>{note}</p>
            <div className='action-btns'>
                <button className='cancel-btn' onClick={onCancel}>
                    <IoMdClose />
                </button>
                <button
                    className='confirm-btn'
                    onClick={onConfirm}
                    disabled={disabled}
                >
                    <IoMdCheckmark />
                </button>
            </div>
        </div>
    )
}

export default ActionButtons
