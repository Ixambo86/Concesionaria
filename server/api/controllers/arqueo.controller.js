const express = require('express');
const router = express.Router();
const reporteService = require('../services/reportes.service');
const arqueoService = require('../services/arqueo.service');
const authorize = require('_helpers/authorize')
//const Role = require('_helpers/role');

// routes
router.put('/arqueo/get_ingreso', authorize(), buscarTotalIngresos);
router.put('/arqueo/get_egreso', authorize(), buscarTotalEgresos);
router.post('/arqueo/set_arqueo', authorize(), guardarArqueo);
router.put('/arqueo/buscar', authorize(), buscarArqueo);

module.exports = router;

function buscarTotalIngresos(req, res, next) {
    reporteService.totalIngresos(req.body)
    .then(result => res.send(result))
    .catch(err => next(err))
}

function buscarTotalEgresos(req, res, next) {
    reporteService.totalEgresos(req.body)
    .then(result => res.send(result))
    .catch(err => next(err))
}

function buscarArqueo(req, res, next) {
    arqueoService.buscarArqueo(req.body)
    .then(result => res.send(result))
    .catch(err => next(err))
}

function guardarArqueo(req, res, next) {
    arqueoService.guardarArqueo(req.body.data)
    .then(result => res.send(result))
    .catch(err => next(err))
}