import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState =(props)=>{
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
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    return(
        <NoteContext.Provider value ={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;