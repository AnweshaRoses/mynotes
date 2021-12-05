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

module.exports = router