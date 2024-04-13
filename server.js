const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');
const ejs = require("ejs");
const PORT = process.env.PORT || 8000;

app.use(session({
    secret: 'ankuxkr', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


const collection = require('./mongodb');


app.set('view engine', 'ejs'); //middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"public")))


app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/users/login', (req, res)=>{
    res.render('login');
});

app.get('/users/register', (req, res)=>{
    res.render('register');
});

app.get('/users/dashboard', (req, res)=>{

    if (req.session.user) {
        res.render('dashboard', { userName: req.session.user.name }); 
    } else {
        res.redirect('/users/login'); 
    }

});

app.get('/quiz', (req, res)=>{
    res.render('quiz');
});


app.post('/users/register', async (req, res)=>{
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    await collection.insertMany([data]);
    req.session.user = { name: data.name };
    res.render('users/dashboard');
})

app.post('/users/login', async (req, res)=>{
    try {
        const check = await collection.findOne({email:req.body.email});
        if( check && check.password == req.body.password) { //ensuring check is not null
            req.session.user = { name: check.name };
            res.redirect('/users/dashboard');
        }
        else{
            res.send('wrong password');
        }
    } catch (error) {
        res.send('user not found');
    }

})


app.listen(PORT, ()=>console.log(`Server Started at ${PORT}`));