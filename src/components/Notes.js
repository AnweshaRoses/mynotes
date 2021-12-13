import React,{useContext} from 'react'
import noteContext from "../context/notes/NoteContext"
import AddNotes from './AddNotes'
import Noteitem from './Noteitem'


const Notes = () => {
    const context = useContext(noteContext)
    const {notes}=context
    return (
        <>
        <AddNotes/>
        <div className="row my-3">
        <h3>Your Notes</h3>
        {notes.map((note)=>{
            return <Noteitem key={note._id} note={note}/>;
        })}
    </div>
    </>
    )
}

export default Notes
