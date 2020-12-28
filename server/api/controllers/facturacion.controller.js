const express = require('express');
const router = express.Router();
const apiService = require('../services/facturacion.service');
const authorize = require('_helpers/authorize');
//const Role = require('_helpers/role');

// routes

router.put('/facturas/get', authorize(), buscarFacturas);
router.put('/facturas/detalle', authorize(), buscarFacturaDetalle);
router.post('/facturas/insert_pago', authorize(), insertarFacturaPago);
router.post('/facturas/insert', authorize(), insertarFactura);
router.put('/facturas/update', authorize(), actualizarFactura);
router.post('/facturas/insert_detalle', authorize(), insertarFacturaDetalle);
router.post('/facturas/insert_historia', authorize(), insertarHistoriaFactura);
router.put('/facturas/historia', authorize(), buscarHistoriaFactura);

module.exports = router;

function buscarFacturas(req, res, next) {
    apiService.buscarFacturas(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}
function insertarFacturaPago(req, res, next) {
    apiService.insertarFacturaPago(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}

function buscarFacturaDetalle(req, res, next) {
    apiService.buscarFacturaDetalle(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}

function insertarFactura(req, res, next) {
    apiService.insertarFactura(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}

function insertarFacturaDetalle(req, res, next) {
    apiService.insertarFacturaDetalle(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}

function actualizarFactura(req, res, next) {
    apiService.actualizarFactura(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}

function insertarHistoriaFactura(req, res, next) {
    apiService.insertarHistoriaFactura(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}

function buscarHistoriaFactura(req, res, next) {
    apiService.buscarHistoriaFactura(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}