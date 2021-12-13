import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState =(props)=>{
  //hard coded few notes
    const notesInitial =[
        {
          "_id": "61ac5053fe3c979bcd54fe51",
          "user": "61a9ab45acad614b4a940066",
          "title": "Routine",
          "description": "Wake up",
          "tag": "personal",
          "date": "2021-12-05T05:38:27.317Z",
          "__v": 0
        },
        {
          "_id": "61b13d87519895c7a59d7f44",
          "user": "61a9ab45acad614b4a940066",
          "title": "complete c++",
          "description": "the girl code",
          "tag": "girl code",
          "date": "2021-12-08T23:19:35.666Z",
          "__v": 0
        },
        {
          "_id": "61b13d875198953c7a59d7f44",
          "user": "61a9ab45acad614b4a940066",
          "title": "complete c++",
          "description": "the girl code",
          "tag": "girl code",
          "date": "2021-12-08T23:19:35.666Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)

      // Add a note
      const addNote=(title, description,tag)=>{
        //TODO:API call
        const note=        {
          "_id": "61b13d875198953c7a59d7f44",
          "user": "61a9ab45acad614b4a940066",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-12-08T23:19:35.666Z",
          "__v": 0
        };
        //we use concat to add whatever we type to ""
        setNotes(notes.concat(note))
      }

      // Delete a note
      const deleteNote=()=>{

      }
      
      // edit a note
      const editNote=()=>{

      }
    return(
        <NoteContext.Provider value ={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;