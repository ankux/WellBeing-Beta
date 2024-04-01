const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const { pool } = require('./dbConfig')

const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs'); //middleware
app.use(express.urlencoded({ extended: false }));

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
    res.render('dashboard', {user: "Ankush"});
});

app.post('/users/register', async (req, res) => {
    let { name, email, password, password2 } = req.body;
    console.log({
        name,
        email,
        password,
        password2
    });

    let errors = []

    if (!name || !email || !password || !password2){
        errors.push({ message: "Fill all the fields" })
        res.render('register');
    }

    if (password.length < 8){
        errors.push({ message: "Password should be at least 8 characters" })
        res.render('register');
    }

    if (password != password2){
        errors.push({ message: "Passwrods do not match" })
        res.render('register');
    }

    if (errors.length > 0){
        
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email], 
        (err, results) => {
            if(err) {
                throw err;
            }
            console.log(results.rows);
        }
    )

    
});

app.listen(PORT, ()=>console.log(`Server Started at ${PORT}`));