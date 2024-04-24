const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/wellbeingdb")
.then(()=>{
    console.log('mongodb connected');
})
.catch(()=>{
    console.log('failded to connect');
})

//Log in Schema
const LogInSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users", LogInSchema);


//Blog Post Schema
const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorEmail: {
        type: String,
        required: true
    },
    imgurl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);


module.exports = { collection, BlogPost }