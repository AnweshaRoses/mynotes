const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

//Route 1: Get all the notes using: GET"/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal sever error")
    }

})
// Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    //making sure that the desc has atleast 1 character else we throw an error
    body('title', 'Enter a valid title').isLength({ min: 0 }),
    body('description', 'You should minimum have 1 character in description').isLength({ min: 1 }),
], async (req, res) => {
    try {


        //derefencing all the variables
        const { title, description, tag } = req.body;
        //if there are errors return bad requests and the erros
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //critireas required for a new note
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        //saving our note in mongo db 
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal sever error");
    }

})
// Route 3: Update an exsisting note: PUT "/api/notes/updatenote". Login required
//we are checking for the id so we update the note user wants to update (each note has unique id)
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {

        //create a newNote object
        //these are the parameters that we are allowing user to update
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        // Find the note and update it 
        //we throw this error if we are not able to find the id of the note
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(400).send("Not Found") }
        // if an user tries to change someone else's note then we throw this error
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        //if we find the id of the note and there were no errors then we update them
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal sever error");
    }
})

// Route 4: delete an exsisting note: DELETE"/api/notes/deletenote". Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // const { title, description, tag } = req.body;
    try {

        // Find the note to be deleted and delete it it 
        //we throw this error if we are not able to find the id of the note
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(400).send("Not Found") }
        // if an user tries to change someone else's note then we throw this error
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        //if we find the id of the note and there were no errors then we delete them
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal sever error");
    }
})
// "serve": "nodemon index.js",
module.exports = router