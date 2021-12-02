const mongoose=require('mongoose');

// added /mynotes so it will create a new folder named "mynotes" on mongodb
const mongoURI="mongodb://localhost:27017/mynotes?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
//fuction which uses the above url to connect to mongo db 
const connectTOMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongo successfully");
    })
}
module.exports=connectTOMongo;