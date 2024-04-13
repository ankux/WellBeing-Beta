const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
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


function ensureNotAuthenticated(req, res, next) {
    if (req.session.user) {
        res.redirect('/users/dashboard');
    } else {
        return next();
    }
}


app.get('/', ensureNotAuthenticated, (req, res)=>{
    res.render('index');
});


app.get('/users/login', (req, res)=>{
    res.render('login');
});


app.get('/users/register', (req, res)=>{
    res.render('register');
});


function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}

app.get('/users/dashboard', ensureAuthenticated, (req, res)=>{
    res.render('dashboard', { userName: req.session.user.name });
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


app.get('/users/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/users/dashboard');
        }
        res.redirect('/');
    });
});


app.listen(PORT, ()=>console.log(`Server Started at ${PORT}`));