import { useState, useRef, useEffect } from 'react'

const EditableNote = ({
    note,
    editNote,
}: {
    note: string | undefined
    editNote: (editedNote: string | undefined) => void
}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editedNote, setEditedNote] = useState(note)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isEditing])

    const handleDoubleClick = () => {
        setIsEditing(true)
    }

    const handleBlur = () => {
        setIsEditing(false)
        editNote(editedNote)
    }

    const handleChange = (e) => {
        setEditedNote(e.target.value)
    }

    return (
        <div>
            {isEditing ? (
                <input
                    type='text'
                    className='photo-note'
                    ref={inputRef}
                    value={editedNote}
                    placeholder={note}
                    maxLength={20}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            ) : note ? (
                <p className='photo-note' onDoubleClick={handleDoubleClick}>
                    {note}
                </p>
            ) : (
                <p className='photo-note' onDoubleClick={handleDoubleClick}>
                    Add note
                </p>
            )}
        </div>
    )
}

export default EditableNote
