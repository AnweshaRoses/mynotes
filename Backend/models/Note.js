const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    user:{
        // This helps us check user and show only that user's data
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default:"General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  module.exports=mongoose.model('notes',NotesSchema);