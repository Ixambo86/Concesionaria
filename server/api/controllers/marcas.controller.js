const express = require('express');
const router = express.Router();
const apiService = require('../services/marcas.service');
const authorize = require('_helpers/authorize')
//const Role = require('_helpers/role');

// routes

router.post('/marca/insertar', authorize(), insertarMarca);
router.post('/marca/editar', authorize(), editarMarca);
router.post('/marca/eliminar', authorize(), eliminarMarca);
router.put('/MarcasyModelos/get', authorize(), buscarMarcayModelos);


module.exports = router;


function buscarMarcayModelos(req, res, next) {
    apiService.buscarMarcayModelos(req.body.filtro)
    .then(marca => res.send(marca))
    .catch(err => next(err))
}

function insertarMarca(req, res, next) {
    apiService.insertarMarca(req.body)
    .then(marca => res.send(marca))
    .catch(err => next(err))
}

function editarMarca(req, res, next) {
    apiService.editarMarca(req.body)
    .then(marca => res.send(marca))
    .catch(err => next(err))
}

function eliminarMarca(req, res, next) {
    apiService.eliminarMarca(req.body)
    .then(marca => res.send(marca))
    .catch(err => next(err))
}