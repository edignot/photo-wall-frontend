import { useState, useRef, useEffect } from 'react'

const Note = ({
    note,
    editNote,
}: {
    note?: string
    editNote: (editedNote: string | undefined) => void
}) => {
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

    const handleBlur = (): void => {
        setEditMode(false)
        editNote(editedNote)
    }

    const handleChange = (event): void => {
        setEditedNote(event.target.value)
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
                    onChange={handleChange}
                    onBlur={handleBlur}
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
