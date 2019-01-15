let mongoose = require('mongoose');
let options = {
  useNewUrlParser: true,
};
let db = null;
const state = 'online';
const information = {
  mongo: {
    dbName: '',
    dbUser: '',
    dbPassword: '',
    dbHost: '',
    dbPort: '',
    dbUrl: 'mongodb://'
  }
};
switch (state) {
  case 'local' :
    information.mongo.dbName = 'gestapio';
    information.mongo.dbHost = '127.0.0.1';
    information.mongo.dbPort = ':27017';
    information.mongo.dbUser = '';
    information.mongo.dbPassword = '';
    information.mongo.dbUrl += information.mongo.dbUser + information.mongo.dbPassword + information.mongo.dbHost + information.mongo.dbPort + '/' + information.mongo.dbName;
    break;
  case 'online' :
    information.mongo.dbName = 'beep';
    information.mongo.dbHost = '@ds127854.mlab.com';
    information.mongo.dbPort = ':27854';
    information.mongo.dbUser = 'admin';
    information.mongo.dbPassword = ':admin1234';
    information.mongo.dbUrl += information.mongo.dbUser + information.mongo.dbPassword + information.mongo.dbHost + information.mongo.dbPort + '/' + information.mongo.dbName;
    break;
}
mongoose.connect(information.mongo.dbUrl, options);
db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function () {
  console.log("Connexion à la base OK");
});