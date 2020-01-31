const handlerSignin = (db, bcrypt) => (req, resp) => {
   const {email, password} = req.body;
   db.select('email', 'hash').from('login')
      .where('email', '=', email)
      .then(data => {
         const isValid = bcrypt.compareSync(password,data[0].hash);
         if (isValid) {
            return db.select('*').from('users')
               .where('email', '=', email)
               .then(user => {
                  resp.json(user[0]);
               })
               .catch(err => resp.status(400).json('No se encontro el usuario'))
         } else {
            resp.status(400).json('Usuario y/o contraseña incorrecto')
         }
      })
      .catch(err => resp.status(400).json('Usuario y/o contraseña incorrecto'))
}

module.exports = {
   handlerSignin: handlerSignin
};
