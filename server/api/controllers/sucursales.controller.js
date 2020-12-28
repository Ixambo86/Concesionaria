const express = require('express');
const router = express.Router();
const apiService = require('../services/sucursales.service');
const authorize = require('_helpers/authorize')


// routes
router.put('/sucursales/get', authorize(), buscarSucursales);
router.put('/sucursales/get_by_id', authorize(), buscarSucursal);
router.post('/sucursales/insertar', authorize(), insertarSucursal);
router.post('/sucursales/editar', authorize(), editarSucursal);
router.post('/sucursales/eliminar', authorize(), eliminarSucursal);
router.post('/localidad/InsertarNuevaLicalidad', authorize(), InsertarNuevaLicalidad);

module.exports = router;

function InsertarNuevaLicalidad(req, res, next) {
    apiService.InsertarNuevaLicalidad(req.body)
    .then(localidad => res.send(localidad))
    .catch(err => next(err))
}

function buscarSucursales(req, res, next) {
    apiService.buscarSucursales(req.body.filtro)
    .then(sucursal => res.send(sucursal))
    .catch(err => next(err))
}

function buscarSucursal(req, res, next) {
    apiService.buscarSucursal(req.body.id)
    .then(sucursal => res.send(sucursal))
    .catch(err => next(err))
}

function insertarSucursal(req, res, next) {
    apiService.insertarSucursal(req.body)
    .then(sucursal => res.send(sucursal))
    .catch(err => next(err))
}

function editarSucursal(req, res, next) {
    apiService.editarSucursal(req.body)
    .then(sucursal => res.send(sucursal))
    .catch(err => next(err))
}

function eliminarSucursal(req, res, next) {
    apiService.eliminarSucursal(req.body)
    .then(sucursal => res.send(sucursal))
    .catch(err => next(err))
}
