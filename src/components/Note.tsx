import { useState, useRef, useEffect } from 'react'

interface NoteProps {
    note?: string
    editNote: (editedNote: string | undefined) => void
}

const Note = ({ note, editNote }: NoteProps) => {
    const [isEditMode, setEditMode] = useState<boolean>(false)
    const [editedNote, setEditedNote] = useState(note)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isEditMode && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isEditMode])

    const handleDoubleClick = (): void => {
        setEditMode(true)
    }

    const handleEdit = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEditedNote(event.target.value)
    }

    const handleConfirmEdit = (
        event:
            | React.KeyboardEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (
            ('key' in event && event.key === 'Enter') ||
            event.type === 'blur'
        ) {
            if (editedNote !== note) {
                setEditMode(false)
                editNote(editedNote)
            } else {
                setEditMode(false)
            }
        }
    }

    return (
        <div>
            {isEditMode ? (
                <input
                    type='text'
                    className='note'
                    ref={inputRef}
                    value={editedNote}
                    placeholder={note}
                    maxLength={20}
                    onChange={handleEdit}
                    onKeyDown={handleConfirmEdit}
                    onBlur={handleConfirmEdit}
                />
            ) : note ? (
                <p className='note' onDoubleClick={handleDoubleClick}>
                    {note}
                </p>
            ) : (
                <p className='note-empty' onDoubleClick={handleDoubleClick}>
                    Add note
                </p>
            )}
        </div>
    )
}

export default Note
