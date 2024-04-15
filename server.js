const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const { collection, BlogPost } = require('./mongodb');
const PORT = process.env.PORT || 8000;


//middlewae
app.set('view engine', 'ejs'); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"public")));

app.use(session({
    secret: 'ankuxkr', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


function ensureNotAuthenticated(req, res, next) {
    if (req.session.user) {
        res.redirect('/users/dashboard');
    } else {
        return next();
    }
}

function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}



//All routes
app.get('/', ensureNotAuthenticated, (req, res)=>{
    res.render('index');
});


app.get('/users/login', (req, res)=>{
    res.render('login', { errorMessage: '' }); //When rendering the login page after a failed login attempt, you're already passing the errorMessage variable. Ensure this is done for all cases, including when the page is initially loaded or when redirected from another route.
});


app.get('/users/register', (req, res)=>{
    res.render('register');
});


app.get('/users/dashboard', ensureAuthenticated, (req, res)=>{
    res.render('dashboard', { userName: req.session.user.name });
});


app.get('/quiz', (req, res)=>{
    res.render('quiz');
});


app.get('/users/blog', ensureAuthenticated, async (req, res)=>{
    try {
        const blogPosts = await BlogPost.find({}).sort({ createdAt: -1 });
        res.render('blog', { blogPosts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


app.get('/users/writeblog', ensureAuthenticated, (req, res)=>{
    res.render('writeblog', { userName: req.session.user.name });
});


app.get('/users/blog/view-post/:id', ensureAuthenticated, async (req, res)=>{
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).send('Post not found');
        }
        res.render('view-post', { blogPost });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


app.get('/users/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/users/dashboard');
        }
        res.redirect('/');
    });
});


app.post('/users/register', async (req, res)=>{
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    await collection.insertMany([data]);
    req.session.user = { name: data.name };
    res.redirect('/users/dashboard');
})


app.post('/users/login', async (req, res)=>{
    try {
        const check = await collection.findOne({email:req.body.email});
        if (check) { //ensuring check is not null: user is registered
            if( check.password == req.body.password) { //ensuring the password is correct
                req.session.user = { name: check.name };
                res.redirect('/users/dashboard');

            }
            else{
                res.render('login', { errorMessage: "Incorrect Password" });
            }
        } else {
            res.render('login', { errorMessage: "User not found" });
        }

    } catch (error) {
        console.log(error);
        res.render('login', { errorMessage: "An error occured" });
    }
})


app.post('/users/writeblog', async (req, res) => {
    const blogPost = {
        title: req.body.title,
        content: req.body.content,
        author: req.session.user.name 
    }

    try {
        await BlogPost.insertMany([blogPost]);
        res.redirect('/users/blog');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


// Catch all routes that are not defined: the last route
app.use((req, res, next) => {
    res.status(404).render('404', { title: '404 - Page Not Found' });
});

app.listen(PORT, ()=>console.log(`Server Started at ${PORT}`));