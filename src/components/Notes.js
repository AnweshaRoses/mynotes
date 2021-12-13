import React, { useContext, useEffect, useRef,useState} from 'react'
import noteContext from "../context/notes/NoteContext"
import AddNotes from './AddNotes'
import Noteitem from './Noteitem'


const Notes = () => {
    const [note, setNote] = useState({title: "",description:"",tag:"default"})
    const context = useContext(noteContext)
    const { notes, getNotes } = context
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])
    const updateNote = (note) => {
        ref.current.click();

    }
    const ref = useRef(null)
    const handleClick=(e)=>{
        e.preventDefault() //Page reload nahi hoga
    }
    //when we type something in the box
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <>
            <AddNotes />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className="mb-2">
                                    <label htmlFor="title" className="form-label"></label>
                                    <input type="Text" className="form-control" id="etitle" name="etitle" placeholder="Edit Title" onChange={onChange} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="description" className="form-label"></label>
                                    <textarea className="form-control" id="edescription" rows="14" name="edescription" onChange={onChange} placeholder="Edit Description"></textarea>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="tag" className="form-label"></label>
                                    <textarea className="form-control" id="etag" rows="1" name="etag" onChange={onChange} placeholder="Edit tag"></textarea>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h3>Your Notes</h3>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes
