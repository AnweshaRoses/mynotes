import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  //hard coded few notes
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all note
  const getNotes = async  () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
  
      headers: {
        'Content-Type': 'application/json',
        'auth-token' :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhOWFiNDVhY2FkNjE0YjRhOTQwMDY2In0sImlhdCI6MTYzODc2ODY1Mn0.AwdIN7XHRhNr-w-2Ib-EHMrBBwji-m5PCLQ8sZ_aIe4'
      },
    });
    const json=await response.json()
    console.log(json);
    setNotes(json);
  
  }

  // Add a note
  const addNote = async  (title, description, tag) => {
    //TODO:API call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: 'POST', 
  
      headers: {
        'Content-Type': 'application/json',
        'auth-token' :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhOWFiNDVhY2FkNjE0YjRhOTQwMDY2In0sImlhdCI6MTYzODc2ODY1Mn0.AwdIN7XHRhNr-w-2Ib-EHMrBBwji-m5PCLQ8sZ_aIe4'
      },
  
      body: JSON.stringify({title,description,tag}) 
    });
    const note= await response.json();
    //we use concat to add whatever we type to ""
    setNotes(notes.concat(note))
  
  }

  // Delete a note
  const deleteNote = async (id) => {
    // TODO: API CALL
    //filter always takes an arrow function
    //note.id is the id we gave for delete note check Noteitem.js
    const newNotes = notes.filter((note) => { return note._id !== id }) //we need to return to else it will throw error 
    //so basicaly if the id matches then we delete
    setNotes(newNotes)
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhOWFiNDVhY2FkNjE0YjRhOTQwMDY2In0sImlhdCI6MTYzODc2ODY1Mn0.AwdIN7XHRhNr-w-2Ib-EHMrBBwji-m5PCLQ8sZ_aIe4'
      },
      
    });
    const json= await response.json();
    console.log(json);
  }
  
  // edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhOWFiNDVhY2FkNjE0YjRhOTQwMDY2In0sImlhdCI6MTYzODc2ODY1Mn0.AwdIN7XHRhNr-w-2Ib-EHMrBBwji-m5PCLQ8sZ_aIe4'
      },
      
      body: JSON.stringify({title,description,tag})
    });
    const json=await response.json();
    console.log(json);

    let newNotes=JSON.parse(JSON.stringify(notes))
    // Logic to edit the notes in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;