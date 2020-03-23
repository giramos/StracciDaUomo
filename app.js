// Módulos
var express =  require('express');
var app = express();

// Variables
app.set('port', 8081);

//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app); // (app, param1, param2, etc.)
require("./routes/rlooks.js")(app); // (app, param1, param2, etc.)


// lanzar el servidor
app.listen(app.get('port'), function () {
    console.log("Servidor activo");
});