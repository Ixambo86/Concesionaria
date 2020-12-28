const express = require('express');
const router = express.Router();
const apiService = require('../services/modelos.service');
const authorize = require('_helpers/authorize')
//const Role = require('_helpers/role');

// routes

router.post('/modelo/insertar', authorize(), insertarModelo);
router.post('/modelo/editar', authorize(), editarModelo);
router.post('/modelo/eliminar', authorize(), eliminarModelo);
router.put('/modelos/get_por_marca', authorize(), buscarModelos);


module.exports = router;



function buscarModelos(req, res, next) {
    apiService.buscarModelos(req.body.filtro)
    .then(modelo => res.send(modelo))
    .catch(err => next(err))
}


function insertarModelo(req, res, next) {
    apiService.insertarModelo(req.body)
    .then(marca => res.send(marca))
    .catch(err => next(err))
}

function editarModelo(req, res, next) {
    apiService.editarModelo(req.body)
    .then(marca => res.send(marca))
    .catch(err => next(err))
}

function eliminarModelo(req, res, next) {
    apiService.eliminarModelo(req.body)
    .then(marca => res.send(marca))
    .catch(err => next(err))
}