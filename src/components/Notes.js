import React,{useContext, useEffect} from 'react'
import noteContext from "../context/notes/NoteContext"
import AddNotes from './AddNotes'
import Noteitem from './Noteitem'


const Notes = () => {
    const context = useContext(noteContext)
    const {notes,getNotes}=context
    useEffect(()=>{
        getNotes();
    },[])
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
