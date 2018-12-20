var mongoose = require('mongoose');
var options = {
  useNewUrlParser: true
};
var db = null;
mongoose.connect('mongodb://127.0.0.1:27017/gestapio', options);
db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function () {
  console.log("Connexion à la base OK");
});