module.exports = function(app, swig) {

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
        res.send("Look agregado: " + req.body.nombre +"<br>"
        + "Temporada: " + req.body.genero + "<br>"
        + "Descipcion: " + req.body.descripcion);
    })

};
