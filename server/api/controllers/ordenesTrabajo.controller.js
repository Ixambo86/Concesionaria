const express = require('express');
const router = express.Router();
const apiService = require('../services/ordenesTrabajo.service');
const authorize = require('_helpers/authorize')
//const Role = require('_helpers/role');

// routes
router.put('/ordenes_trabajo/get', authorize(), buscarOrdenes);
router.put('/ordenes_trabajo/update', authorize(), actualizarOrden);
router.put('/ordenes_trabajo/delete', authorize(), eliminarOrden);
router.post('/ordenes_trabajo/insert', authorize(), insertarOrden);
router.put('/ordenes_trabajo/get_productos', authorize(), buscarProductosOrden);
router.put('/ordenes_trabajo/delete_productos', authorize(), borrarProductosOrden);
router.post('/ordenes_trabajo/insert_productos', authorize(), insertarProductosOrden);
router.put('/ordenes_trabajo/get_servicios', authorize(), buscarServiciosOrden);
router.post('/ordenes_trabajo/insert_servicios', authorize(), insertarServiciosOrden);
router.post('/ordenes_trabajo/insert_historia', authorize(), insertarHistoriaOrden);
router.put('/ordenes_trabajo/get_historia', authorize(), buscarHistoriaOrden);
router.put('/ordenes_trabajo/asignar_factura', authorize(), asignarFactura);
router.get('/ordenes_trabajo/get_estados', authorize(), obtenerEstados);


module.exports = router;

function buscarOrdenes(req, res, next) {
    apiService.buscarOrdenes(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function actualizarOrden(req, res, next) {
    apiService.actualizarOrden(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function eliminarOrden(req, res, next) {
    apiService.eliminarOrden(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function insertarOrden(req, res, next) {
    apiService.insertarOrden(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}
 
function buscarProductosOrden(req, res, next) {
    apiService.buscarProductosOrden(req.body)
    .then(producto => res.send(producto))
    .catch(err => next(err))
}

function borrarProductosOrden(req, res, next) {
    apiService.borrarProductosOrden(req.body)
    .then(producto => res.send(producto))
    .catch(err => next(err))
}

function insertarProductosOrden(req, res, next) {
    apiService.insertarProductosOrden(req.body)
    .then(producto => res.send(producto))
    .catch(err => next(err))
}

function buscarServiciosOrden(req, res, next) {
    apiService.buscarServiciosOrden(req.body)
    .then(servicio => res.send(servicio))
    .catch(err => next(err))
}

function insertarServiciosOrden(req, res, next) {
    apiService.insertarServiciosOrden(req.body)
    .then(servicio => res.send(servicio))
    .catch(err => next(err))
}


function insertarHistoriaOrden(req, res, next) {
    apiService.insertarHistoriaOrden(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}

function buscarHistoriaOrden(req, res, next) {
    apiService.buscarHistoriaOrden(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}

function asignarFactura(req, res, next) {
    apiService.asignarFactura(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}

function obtenerEstados(req, res, next) {
    apiService.obtenerEstados(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}