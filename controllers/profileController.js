const handlerProfile = (db) => (req, resp) => {
   const {id} = req.params;
   db.select('*').from('users').where({id})
      .then(user => {
         if (user.length){
            resp.json(user[0]);
         } else {
            resp.status(400).json('Usuario no encontrado');
         }
      }).catch(err => resp.status(400).json('Error al obtener el usuario'))
}

module.exports = {
  handlerProfile: handlerProfile
};
