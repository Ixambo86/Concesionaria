const express = require('express');
const router = express.Router();
const apiService = require('../services/documentacion.service');
const authorize = require('_helpers/authorize');
//const Role = require('_helpers/role');

// routes

router.put('/documentos/get', authorize(), buscarDocumentos);
router.post('/documentos/insert', authorize(), insertarDocumento);
router.put('/documentos/update', authorize(), actualizarDocumento);
router.put('/documentos/delete', authorize(), eliminarDocumento);
module.exports = router;

function buscarDocumentos(req, res, next) {
    apiService.buscarDocumentos(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}
function insertarDocumento(req, res, next) {
    apiService.insertarDocumento(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}

function actualizarDocumento(req, res, next) {
    apiService.actualizarDocumento(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}

function eliminarDocumento(req, res, next) {
    apiService.eliminarDocumento(req.body)
    .then(factu => res.send(factu))
    .catch(err => next(err))
}
