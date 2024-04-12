const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 8000;
const ejs = require("ejs")

const { pool } = require('./dbConfig');
const collection = require('./mongodb');


app.set('view engine', 'ejs'); //middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    res.render('dashboard', {user: "Ankush"});
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

    res.render('dashboard');
})

app.post('/users/login', async (req, res)=>{
    
    try {
        const check = await collection.findOne({email:req.body.email});
        if(check.password == req.body.password) {
            res.render('dashboard')
        }
        else{
            res.send('wrong password');
        }
    } catch (error) {
        res.send('user not found');
    }

})

//---  for psql db ---
// app.post('/users/register', async (req, res) => {
//     let { name, email, password, password2 } = req.body;
//     console.log({
//         name,
//         email,
//         password,
//         password2
//     });

//     let errors = []

//     if (!name || !email || !password || !password2){
//         errors.push({ message: "Fill all the fields" })
//         res.render('register');
//     }

//     if (password.length < 8){
//         errors.push({ message: "Password should be at least 8 characters" })
//         res.render('register');
//     }

//     if (password != password2){
//         errors.push({ message: "Passwrods do not match" })
//         res.render('register');
//     }

//     if (errors.length > 0){

//     }
    

//     let hashedPassword = await bcrypt.hash(password, 10);
//     console.log(hashedPassword);

//     pool.query(
//         `SELECT * FROM users WHERE email = $1`,
//         [email], 
//         (err, results) => {
//             if(err) {
//                 throw err;
//             }
//             console.log(results.rows);
//         }
//     )

// });


app.listen(PORT, ()=>console.log(`Server Started at ${PORT}`));