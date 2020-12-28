const express = require('express');
const router = express.Router();
const apiService = require('../services/ordenesCompra.service');
const authorize = require('_helpers/authorize')
//const Role = require('_helpers/role');

// routes
router.put('/ordenes_compra/generate', authorize(), generarOrdenCompra);
router.put('/ordenes_compra/get', authorize(), buscarOrdenes);
router.put('/ordenes_compra/update', authorize(), actualizarOrden);
router.put('/ordenes_compra/delete', authorize(), eliminarOrden);
router.post('/ordenes_compra/insert', authorize(), insertarOrden);
router.put('/ordenes_compra/get_productos', authorize(), buscarProductosOrden);
router.post('/ordenes_compra/insert_productos', authorize(), insertarProductosOrden);
router.post('/ordenes_compra/insert_historia', authorize(), insertarHistoriaOrden);
router.put('/ordenes_compra/get_historia', authorize(), buscarHistoriaOrden);

module.exports = router;

function generarOrdenCompra(req, res, next) {
    apiService.generarOrdenCompra(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

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