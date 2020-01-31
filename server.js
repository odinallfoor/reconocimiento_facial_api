// Import de librerias externas
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

// Import de controladores
const register = require('./controllers/registerController');
const signin = require('./controllers/signinController');
const profile = require('./controllers/profileController');
const imageController = require('./controllers/imageController');


const cors = require('cors');
const knex = require('knex');
const PORT = process.env.PORT || 3000;


const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'cgarrido',
        password : 'Odin2020',
        database : 'reconocimiento-facial'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.options('*',cors());

app.get('/', (req, resp) => {resp.send(database.users)})
app.post('/signin', signin.handlerSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handlerProfile(db))
app.put('/image', imageController.handlerImage(db))
app.post('/imageurl', imageController.handleApiCall)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
