import { IoMdClose, IoMdCheckmark } from 'react-icons/io'

interface ActionButtonsProps {
    onCancel: () => void
    onConfirm: (event: React.SyntheticEvent<HTMLButtonElement>) => void
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
            <p className='note'>{note}</p>
            <div className='action-btn-container'>
                <button className='cancel-btn' onClick={onCancel}>
                    <IoMdClose />
                </button>
                <button
                    className='confirm-btn'
                    onClick={(event) => onConfirm(event)}
                    disabled={disabled}
                >
                    <IoMdCheckmark />
                </button>
            </div>
        </div>
    )
}

export default ActionButtons
