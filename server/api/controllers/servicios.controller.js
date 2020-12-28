const express = require('express');
const router = express.Router();
const apiService = require('../services/servicios.service');
const authorize = require('_helpers/authorize')
//const Role = require('_helpers/role');

// routes
router.put('/servicios/get', authorize(), buscarServicios);
router.put('/servicios/get_producto', authorize(), obtenerProductos);
router.put('/servicios2/get', authorize(), buscarServicios2);
router.post('/servicios/insertar', authorize(), insertarServicio);
router.post('/servicios/insertarCategoria', authorize(), insertarCategoria);
router.post('/servicios/editar', authorize(), editarServicio);
router.put('/categorias_servicio/get', authorize(), buscarCategorias);
router.post('/servicio/eliminar', authorize(), eliminarServicio);

module.exports = router;

function insertarCategoria(req, res, next) {
    apiService.insertarCategoria(req.body)
    .then(servicio => res.send(servicio))
    .catch(err => next(err))
}

function buscarServicios(req, res, next) {
    apiService.buscarServicios(req.body.filtro)
    .then(servicio => res.send(servicio))
    .catch(err => next(err))
}

function buscarServicios2(req, res, next) {
    apiService.buscarServicios2(req.body.filtro)
    .then(servicio2 => res.send(servicio2))
    .catch(err => next(err))
}

function obtenerProductos(req, res, next) {
    apiService.obtenerProductos(req.body.servicios_id, req.body.automotor_id)
    .then(producto => res.send(producto))
    .catch(err => next(err))
}

function insertarServicio(req, res, next) {
    apiService.insertarServicio(req.body)
    .then(servicio => res.send(servicio))
    .catch(err => next(err))
}

function editarServicio(req, res, next) {
    apiService.editarServicio(req.body)
    .then(servicio => res.send(servicio))
    .catch(err => next(err))
}

function buscarCategorias(req, res, next) {
    apiService.buscarCategorias()
    .then(categorias => res.send(categorias))
    .catch(err => next(err))
}

function eliminarServicio(req, res, next) {
    apiService.eliminarServicio(req.body)
    .then(servicio => res.send(servicio))
    .catch(err => next(err))
}