module.exports = function(app, swig, mongo) {

    app.get('/looks/agregar', function (req, res) {
        let respuesta = swig.renderFile('views/bagregar.html', {

        });
        res.send(respuesta);
    });

    app.get("/looks", function(req, res) {
        let looks = [ {
            "nombre" : "look1",
            "descripcion" : "Camisa azul, dockers gris, stan smith"
        }, {
            "nombre" : "look2",
            "descripcion" : "Jersey azul marino, dockers beige, Nb"
        } ];
        let respuesta = swig.renderFile('views/btienda.html' , {
            vendedor: 'Looks de hombre' ,
            looks: looks
        });
        res.send(respuesta);
    });

    app.get('/looks/:id', function(req, res) {
        let respuesta = 'id: ' + req.params.id;
        res.send(respuesta);
    });

    app.post("/look", function (req,res) {
        let look = { nombre: req.body.nombre,
                        genero: req.body.genero,
                        decripcion: req.body.descripcion
        }
        // Conectarse
        mongo.MongoClient.connect(app.get('db'), function(err, db) {
            if (err) {
                res.send("Error de conexión: " + err);
            } else {
                let collection = db.collection('looks');
                collection.insert(look, function(err, result) {
                    if (err) {
                        res.send("Error al insertar " + err);
                    } else {
                        res.send("Agregada id: "+ result.ops[0]._id);
                    }
                    db.close();
                });
            }
        });

    });

};
