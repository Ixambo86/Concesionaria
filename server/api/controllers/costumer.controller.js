const express = require('express');
const router = express.Router();
const apiService = require('../services/costumer.service');
const authorize = require('_helpers/authorize')
//const Role = require('_helpers/role');

// routes

router.get('/costumer/get', authorize(), buscarCostumers);
router.post('/costumer/editar', authorize(), editarMsj);

module.exports = router;


function buscarCostumers(req, res, next) {
    apiService.buscarCostumers()
    .then(costumer => res.send(costumer))
    .catch(err => next(err))
}

function editarMsj(req, res, next) {
    apiService.editarMsj(req.body)
    .then(msj => res.send(msj))
    .catch(err => next(err))
}