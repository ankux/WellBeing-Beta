const mongoose = require('mongoose');
const { types } = require('pg');

mongoose.connect("mongodb://localhost:27017/wellbeingdb")
.then(()=>{
    console.log('mongodb connected');
})
.catch(()=>{
    console.log('failded to connect');
})

const LogInSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const collection = new mongoose.model("users", LogInSchema);

module.exports = collection;