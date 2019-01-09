let mongoose = require('mongoose');
let options = {
  useNewUrlParser: true,
};
let db = null;
// mongoose.connect('mongodb://admin:admin1234@ds127854.mlab.com:27854/beep', options);
mongoose.connect('mongodb://127.0.0.1:27017/gestapio', options);
db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function () {
  console.log("Connexion à la base OK");
});