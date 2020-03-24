// Módulos
var express =  require('express');
var app = express();

let fileUpload = require('express-fileupload');
app.use(fileUpload())

// Módulo mongo
let mongo = require('mongodb');
// Módulo swig
let swig = require('swig');

// Módulo body-parser: POST en formularios
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

let gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app,mongo);

// Variables
app.set('port', 8081);
app.set('db','mongodb://sdmin:sdi@uomo-shard-00-00-q6gnd.mongodb.net:27017,uomo-shard-00-01-q6gnd.mongodb.net:27017,uomo-shard-00-02-q6gnd.mongodb.net:27017/test?ssl=true&replicaSet=uomo-shard-0&authSource=admin&retryWrites=true&w=majority');


//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app, swig, gestorBD); // (app, param1, param2, etc.)
require("./routes/rlooks.js")(app, swig,  gestorBD);  // (app, param1, param2, etc.)


// lanzar el servidor
app.listen(app.get('port'), function () {
    console.log("Servidor activo");
});

