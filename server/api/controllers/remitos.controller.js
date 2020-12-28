const express = require('express');
const router = express.Router();
const apiService = require('../services/remitos.service');
const authorize = require('_helpers/authorize')
const sendEmail = require('../mailSender');
const config = require('config.json')


// routes
router.put('/remitos/get_productoId_nroLote', authorize(), buscarIdProductos);
router.post('/remitos/insertarInventario', authorize(), insertarRemitoInventario);
router.post('/remitos/modificarStock', authorize(), modificarStock);
router.put('/remitos/buscarRemitos', authorize(), buscarRemitos);
router.post('/remitos/insertarRemito', authorize(), insertarRemito);
router.put('/remitos/remitoYaCargado', authorize(), remitoYaCargado);
router.post('/remitos/insertarRemitoEnOrdenCompra', authorize(), insertarRemitoEnOrdenCompra);
router.put('/remitos/buscarOrdenesCompra', authorize(), buscarOrdenesCompra);
router.post('/remitos/EnviarMailValidacionesRemito', authorize(), EnviarMailValidacionesRemito);
router.put('/remitos/ValidarCostoProducto', authorize(), ObtenerInfoProducto);
router.post('/remitos/insertarOrdenCompra', authorize(), insertarOrdenCompra);
router.post('/remitos/insertarCostoEnProducto', authorize(), insertarCostoEnProducto);
router.put('/remitos/obtener_remito_productos', authorize(), obtenerRemitoProductos);
router.put('/remitos/pagar_remito', authorize(), pagarRemito);
router.post('/remitos/insertar_remito_detalle', authorize(), insertarRemitoDetalle);
router.put('/remitos/asignar_nro_lote_otp', authorize(), asignarNroLoteOTP);
router.put('/remitos/asignar_nro_lote_ped', authorize(), asignarNroLotePED);


module.exports = router;

function insertarOrdenCompra(req, res, next) {
    apiService.insertarOrdenCompra(req.body)
        .then(remitos => res.send(remitos))
        .catch(err => next(err))
}

function ObtenerInfoProducto(req, res, next) {
    apiService.ObtenerInfoProducto(req.body)
        .then(remito => res.send(remito))
        .catch(err => next(err))
}

function insertarCostoEnProducto(req, res, next) {
    apiService.insertarCostoEnProducto(req.body)
        .then(remitos => res.send(remitos))
        .catch(err => next(err))
}

function EnviarMailValidacionesRemito(req, res, next) {
    apiService.getEmail(req.body)
        .then((res) => {
            console.log(res[0].sucursal_email)
            console.log(res[0].usuario_email)
            var emails = res[0].sucursal_email +', '+ res[0].usuario_email;
            console.log("emails")
            console.log(emails)
            sendEmail({
                from: 'suport@car-two.com.ar',
                to: emails ,
                subject: 'Se importó un remito con alertas, Nro. de Remito: ' + req.body.nro_remito,
                html: '<h1>Diferencias que se encotraron en la carga del remito: </h1>' + '<br/>' + '<h2>' + req.body.cadenaNoExisteEnOrden + '<br/>' + req.body.cadenaCostoBajo + '<br/>' + req.body.cadenaNoExisteEnRemito +'<br/>'  +req.body.ordenNoExisteMail+ '</h2>'
            })

            sendEmail({
                from: 'suport@car-two.com.ar',
                to: res[0].sucursal_email + ',' + res[0].usuario.email ,
                subject: 'Se importó un remito con alertas, Nro. de Remito: ' + req.body.nro_remito,
                html: '<h1>Diferencias que se encotraron en la carga del remito: </h1>' + '<br/>' + '<h2>' + req.body.cadenaNoExisteEnOrden + '<br/>' + req.body.cadenaCostoBajo + '<br/>' + req.body.cadenaNoExisteEnRemito + '</h2>'
            })


        })
        res.sendStatus(200).send('Se envio un mail Validación importar remitos')

        .catch(err => next(err));
}

function buscarOrdenesCompra(req, res, next) {
    apiService.buscarOrdenesCompra(req.body)
        .then(remito => res.send(remito))
        .catch(err => next(err))
}

function insertarRemitoEnOrdenCompra(req, res, next) {
    apiService.insertarRemitoEnOrdenCompra(req.body)
        .then(remitos => res.send(remitos))
        .catch(err => next(err))
}

function buscarIdProductos(req, res, next) {
    apiService.buscarIdProductos(req.body)
        .then(remito => res.send(remito))
        .catch(err => next(err))
}

function remitoYaCargado(req, res, next) {
    apiService.remitoYaCargado(req.body)
        .then(remito => res.send(remito))
        .catch(err => next(err))
}

function insertarRemito(req, res, next) {
    apiService.insertarRemito(req.body)
        .then(remito => res.send(remito))
        .catch(err => next(err))
}


function insertarRemitoInventario(req, res, next) {
    apiService.insertarRemitoInventario(req.body)
        .then(remito => res.send(remito))
        .catch(err => next(err))
}

function modificarStock(req, res, next) {
    apiService.modificarStock(req.body)
        .then(remito => res.send(remito))
        .catch(err => next(err))
}

function buscarRemitos(req, res, next) {
    apiService.buscarRemitos(req.body)
        .then(proveedor => res.send(proveedor))
        .catch(err => next(err))
}

function obtenerRemitoProductos(req, res, next) {
    apiService.obtenerRemitoProductos(req.body)
        .then(proveedor => res.send(proveedor))
        .catch(err => next(err))
}

function pagarRemito(req, res, next) {
    apiService.pagarRemito(req.body)
        .then(proveedor => res.send(proveedor))
        .catch(err => next(err))
}

function insertarRemitoDetalle(req, res, next) {
    apiService.insertarRemitoDetalle(req.body)
        .then(proveedor => res.send(proveedor))
        .catch(err => next(err))
}

function asignarNroLoteOTP(req, res, next) {
    apiService.asignarNroLoteOTP(req.body)
        .then(proveedor => res.send(proveedor))
        .catch(err => next(err))
}

function asignarNroLotePED(req, res, next) {
    apiService.asignarNroLotePED(req.body)
        .then(proveedor => res.send(proveedor))
        .catch(err => next(err))
}