const express = require('express');
const router = express.Router();
const apiService = require('../services/encuesta.service');
const authorize = require('_helpers/authorize')

router.put('/encuesta/enviar', authorize(), enviarEncuesta);

module.exports = router;

function enviarEncuesta(req) {
    apiService.enviarEncuesta(req.body)
}