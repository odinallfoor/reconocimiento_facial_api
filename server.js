const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const database = {
    users: [
        {
            id: '123',
            name: 'carlos',
            email: 'carlos@gmail.com',
            password: 'yutaqla',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'alexandra',
            email: 'alexandra@gmail.com',
            password: 'acab',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, resp) => {
    console.log('Solicitando usuarios')
    resp.send(database.users);
})

app.post('/signin',(req, resp) => {
    console.log('Solicitando login :', req.body.email + " / " + req.body.password);
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
        resp.json({status: 'ok'});
        console.log('exito');
    } else {
        console.log('Fail');
        resp.status(400).json({ error : 'Usuario y/o password incorrecto'});
    }
})

app.post('/register', (req, resp) => {
    const {email, name, password} = req.body;

    bcrypt.hash(password, null, null,function(err, hash) {
        console.log(hash);
    });


    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })

    resp.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, resp) => {
    const {id} = req.params;
    let encontrado = false;
    database.users.forEach(user => {
        if (user.id === id){
            encontrado = true;
            return resp.json(user);
        }
    })
    if(!encontrado){
        resp.status(400).json('Usuario no encontrado');
    }
})

app.post('/image', (req, resp) => {
    const {id} = req.body;
    let encontrado = false;
    database.users.forEach(user => {
        if (user.id === id){
            encontrado = true;
            user.entries++;
            return resp.json(user.entries);
        }
    })
    if(!encontrado){
        resp.status(400).json('Usuario no encontrado');
    }
})

// app.listen(3000, () => {
//     console.log('app is running on port 3000');
// })
