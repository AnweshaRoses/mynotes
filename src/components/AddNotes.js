
import noteContext from "../context/notes/NoteContext"
import React,{useContext,useState} from 'react'

const AddNotes = () => {
    const context = useContext(noteContext)
    const {addNote}=context
    const [note, setNote] = useState({title: "",description:"",tag:"default"})
    //when we click submit this function is run
    const handleClick=(e)=>{
        e.preventDefault() //Page reload nahi hoga
        addNote(note.title,note.description,note.tag);
    }
    //when we type something in the box
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        //box design
        <div className="container my-4">
        <h2>Add a Note here</h2>
        <form action="">
            <div className="mb-2">
                <label htmlFor="title" className="form-label"></label>
                <input type="Text" className="form-control" id="title" name="title" placeholder="Enter Title" onChange={onChange} />
            </div>
            <div className="mb-2">
                <label htmlFor="description" className="form-label"></label>
                <textarea className="form-control" id="description" rows="14" name="description" onChange={onChange}  placeholder="Start Writing your note"></textarea>
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-dark my-3" onClick={handleClick}>Submit</button>
            </div>

        </form>
    </div>
    )
}

export default AddNotes
