module.exports = function(app) {
    app.get("/looks", function(req, res) {
        let respuesta = "";
        if (req.query.nombre != null)
            respuesta += 'Nombre: ' + req.query.nombre + '<br>';

        if (typeof (req.query.descripcion) != "undefined")
            respuesta += 'Descripcion: ' + req.query.descripcion;

        res.send(respuesta);
    });

    app.get('/looks/:id', function(req, res) {
        let respuesta = 'id: ' + req.params.id;
        res.send(respuesta);
    });

};
