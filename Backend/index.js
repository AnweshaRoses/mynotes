const connectToMongo=require('./db');
const express = require('express')
connectToMongo();
// npm run serve
const app = express()
const port = 5000 //changed the port from 3000 to 500 because react js uses 300

app.use(express.json())

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`MyNotes Backend listening at http://localhost:${port}`);
})
