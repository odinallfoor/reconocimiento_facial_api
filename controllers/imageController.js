const Clarifai = require('clarifai');

const app = new Clarifai.App({
   apiKey: '0b7114a2ee434c1c87ee41d9ab57b7c0'
});

const handleApiCall = (req, resp) => {
   app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
         resp.json(data);
      })
      .catch(err => resp.status(400).json('No se puede utilizar la API'))
}

const handlerImage = (db) => (req, resp) => {
   const {id} = req.body;

   db('users').where('id', '=', id)
      .increment('entries',1)
      .returning('entries')
      .then(entries => {
         resp.json(entries[0]);
      })
      .catch(err =>  resp.status(400).json('No se pudo obtener las entradas'))
}

module.exports = {
   handlerImage: handlerImage,
   handleApiCall: handleApiCall
};
