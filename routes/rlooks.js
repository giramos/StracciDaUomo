module.exports = function(app, swig,  gestorBD) {

    app.get('/looks/agregar', function (req, res) {
        let respuesta = swig.renderFile('views/bagregar.html', {

        });
        res.send(respuesta);
    });

    app.get("/tienda", function(req, res) {
        let criterio = {};
        if( req.query.busqueda != null ){
            criterio = { "nombre" : {$regex : ".*"+req.query.busqueda+".*"} };
        }
        gestorBD.obtenerLooks(criterio, function(looks) {
            if (looks == null) {
                res.send("Error al listar ");
            } else {
                let respuesta = swig.renderFile('views/btienda.html',
                    {
                        looks : looks
                    });
                res.send(respuesta);
            }
        });
    });

    app.get('/looks/:id', function(req, res) {
        let respuesta = 'id: ' + req.params.id;
        res.send(respuesta);
    });

    app.get('/look/:id', function (req, res) {
        let criterio = { "_id" :  gestorBD.mongo.ObjectID(req.params.id)     };
        gestorBD.obtenerLooks(criterio,function(looks){
            if ( looks == null ){
                res.send(respuesta);
            } else {
                let respuesta = swig.renderFile('views/blook.html',
                    {
                        look : looks[0]
                    });
                res.send(respuesta);
            }
        });
    });

    app.post("/look", function (req,res) {
        let look = { nombre: req.body.nombre,
                        genero: req.body.genero,
                        descripcion: req.body.descripcion
        }
        // Conectarse
        gestorBD.insertarLook(look, function(id){
            if (id == null) {
                res.send("Error al insertar el look");
            } else {
                if (req.files.portada != null) {
                    let imagen = req.files.portada;
                    imagen.mv('public/portadas/' + id + '.jpg', function(err) {
                        if (err) {
                            res.send("Error al subir la portada");
                        } else {
                            res.send("Agregada id: " + id);
                        }
                    });
                }

            }
        });

    });

};
