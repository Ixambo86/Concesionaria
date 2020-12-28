const express = require('express');
const router = express.Router();
const apiService = require('../services/clientes.service');
const authorize = require('_helpers/authorize')
//const Role = require('_helpers/role');

// routes
router.put('/clientes/get', authorize(), buscarClientes);
router.put('/cliente/get', authorize(), buscarCliente);
router.post('/clientes/insertar', authorize(), insertarCliente);
router.post('/clientes/editar', authorize(), editarCliente);
router.post('/clientes/eliminar', authorize(), eliminarCliente);
router.put('/clientes/eliminados', authorize(), verificarClienteEliminado);
router.get('/clientes/paises', authorize(), buscarPaises);
router.put('/clientes/provincia', authorize(), buscarProvincias);
router.put('/clientes/localidad', authorize(), buscarLocalidades);
router.get('/clientes/iva', authorize(), buscarIvas);
 
module.exports = router;

function buscarClientes(req, res, next) {
    apiService.buscarClientes(req.body.filtro)
    .then(cliente => res.send(cliente))
    .catch(err => next(err))
}

function buscarCliente(req, res, next) {
    apiService.buscarCliente(req.body)
    .then(cliente => res.send(cliente))
    .catch(err => next(err))
}

function insertarCliente(req, res, next) {
    apiService.insertarCliente(req.body)
    .then(cliente => res.send(cliente))
    .catch(err => next(err))
}

function editarCliente(req, res, next) {
    apiService.editarCliente(req.body)
    .then(cliente => res.send(cliente))
    .catch(err => next(err))
}

function eliminarCliente(req, res, next) {
    apiService.eliminarCliente(req.body)
    .then(cliente => res.send(cliente))
    .catch(err => next(err))
}

function verificarClienteEliminado(req, res, next) {
    apiService.verificarClienteEliminado(req.body)
    .then(documento => res.send(documento))
    .catch(err => next(err))
}

function buscarPaises(req, res, next) {
    apiService.buscarPaises()
    .then(paises => res.send(paises))
    .catch(err => next(err))
}

function buscarProvincias(req, res, next) {
    console.log(req.body)
    apiService.buscarProvincias(req.body)
    .then(provincias => res.send(provincias))
    .catch(err => next(err))
}

function buscarLocalidades(req, res, next) {
    apiService.buscarLocalidades(req.body)
    .then(localidades => res.send(localidades))
    .catch(err => next(err))
}

function buscarIvas(req, res, next) {
    apiService.buscarIvas()
    .then(ivas => res.send(ivas))
    .catch(err => next(err))
}
