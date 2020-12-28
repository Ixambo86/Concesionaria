const express = require('express');
const router = express.Router();
const apiService = require('../services/pagos.service');
const authorize = require('_helpers/authorize');
//const Role = require('_helpers/role');

// routes

router.get('/pagos/medios_pago', authorize(), buscarMediosPago);
router.put('/pagos/get', authorize(), buscarPagos);
router.put('/pagos/pago', authorize(), obtenerPago);
router.put('/pagos/detalle', authorize(), obtenerDetallePago);
router.post('/pagos/insert', authorize(), insertarPago);
router.post('/pagos/insert_detalle', authorize(), insertarPagoDetalle);

module.exports = router;

function buscarMediosPago(req, res, next) {
    apiService.buscarMediosPago(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}

function buscarPagos(req, res, next) {
    apiService.buscarPagos(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}

function obtenerPago(req, res, next) {
    apiService.obtenerPago(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}

function obtenerDetallePago(req, res, next) {
    apiService.obtenerDetallePago(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}

function insertarPago(req, res, next) {
    apiService.insertarPago(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}

function insertarPagoDetalle(req, res, next) {
    apiService.insertarPagoDetalle(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}
