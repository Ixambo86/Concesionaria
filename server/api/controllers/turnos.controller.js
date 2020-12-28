const express = require('express');
const router = express.Router();
const apiService = require('../services/turnos.service');
const authorize = require('_helpers/authorize')
//const Role = require('_helpers/role');

// routes
router.put('/turnos/get', authorize(), buscarTurnos);
router.put('/turnos/update', authorize(), cancelarTurno);
router.put('/turnos/delete', authorize(), eliminarTurno);
router.post('/turnos/insert', authorize(), insertarTurno);
router.get('/sucursales/get', authorize(), buscarSucursales);
router.put('/tordenes/get', authorize(), buscarOrdenes);

module.exports = router;

function buscarTurnos(req, res, next) {
    apiService.buscarTurnos(req.body.fecha, req.body.sucursal)
    .then(turnos => res.send(turnos))
    .catch(err => next(err))
}

function cancelarTurno(req, res, next) {
    apiService.cancelarTurno(req.body.fecha, req.body.modulo, req.body.sucursal, req.body.numOt, req.body.mecanico)
    .then(turnos => res.send(turnos))
    .catch(err => next(err))
}

function eliminarTurno(req, res, next) {
    apiService.eliminarTurno(req.body.fecha, req.body.modulo, req.body.sucursal, req.body.numOt, req.body.mecanico)
    .then(turnos => res.send(turnos))
    .catch(err => next(err))
}

function insertarTurno(req, res, next) {
    apiService.insertarTurno(req.body.fecha, req.body.modulo, req.body.sucursal, req.body.orden, req.body.numOt, req.body.cantModulos, req.body.mecanico, req.body.cliente)
    .then(turnos => res.send(turnos))
    .catch(err => next(err))
}

function buscarSucursales(req, res, next) {
    apiService.buscarSucursales()
    .then(sucursales => res.send(sucursales))
    .catch(err => next(err))
}

function buscarOrdenes(req, res, next) {
    apiService.buscarOrdenes(req.body)
    .then(ordenes => res.send(ordenes))
    .catch(err => next(err))
}
