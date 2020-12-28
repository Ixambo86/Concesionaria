const express = require('express');
const router = express.Router();
const apiService = require('../services/automotores.service');
const authorize = require('_helpers/authorize')
//const Role = require('_helpers/role');

// routes
router.post('/automotores/insertarVersion', authorize(), insertarVersion);
router.put('/automotores/get', authorize(), buscarAutomotores);
router.post('/automotores/insert', authorize(), insertarAutomotor);
router.post('/automotores/editar', authorize(), editarAutomotor);
router.post('/automotores/InsertarNuevoColor', authorize(), InsertarNuevoColor);
/*****************************************************************************/
router.put('/automotores/get_carrocerias', authorize(), buscarCarrocerias);
router.put('/automotores/get_tipos_motores', authorize(), buscarTipoMotor);
router.put('/automotores/buscarSucursales', authorize(), buscarSucursales);
router.put('/automotores/get_tipos_transmisiones', authorize(), buscarTransmision);
router.put('/automotores/get_colores', authorize(), buscarColor);
router.put('/automotores/get_versiones_by_modelo', authorize(), buscarVersiones);
router.post('/automotores/insert_versiones_configuracion', authorize(), insertarVersionConfig); 
/*****************************************************************************/
router.put('/modelos/get_by_marca', authorize(), buscarModelos);
router.put('/automotores/delete', authorize(), eliminarAutomotor);  //funcion que no parece estar bien
router.put('/marcas/get', authorize(), buscarMarca);
router.post('/automotores/ObtenerVersionConfigId', authorize(), ObtenerVersionConfigId);
router.post('/automotores/get_catalogo', authorize(), obtenerCatalogo);



module.exports = router;


function insertarVersion(req, res, next) {
    apiService.insertarVersion(req.body)
    .then(version => res.send(version))
    .catch(err => next(err))
}

function buscarAutomotores(req, res, next) {
    apiService.buscarAutomotores(req.body.filtro, req.body.cliente_id)
    .then(automotor => res.send(automotor))
    .catch(err => next(err))
}

function insertarAutomotor(req, res, next) {
    apiService.insertarAutomotor(req.body)
    .then((automotor) => res.send(automotor))
    .catch(err => next(err))
}

function InsertarNuevoColor(req, res, next) {
    apiService.InsertarNuevoColor(req.body)
    .then(color => res.send(color))
    .catch(err => next(err))
}

function editarAutomotor(req, res, next) {
    apiService.editarAutomotor(req.body)
    .then((automotor) => res.send(automotor))
    .catch(err => next(err))
}
/********************************************************/
function buscarCarrocerias(req, res, next) {
    apiService.buscarCarrocerias()
    .then(carroceria => res.send(carroceria))
    .catch(err => next(err))
}

function buscarTipoMotor(req, res, next) {
    apiService.buscarTipoMotor()
    .then(motor => res.send(motor))
    .catch(err => next(err))
}

function buscarSucursales(req, res, next) {
    apiService.buscarSucursales()
    .then(motor => res.send(motor))
    .catch(err => next(err))
}

function buscarTransmision(req, res, next) {
    apiService.buscarTransmision()
    .then(transmision => res.send(transmision))
    .catch(err => next(err))
}

function buscarColor(req, res, next) {
    apiService.buscarColor()
    .then(color => res.send(color))
    .catch(err => next(err))
}

function buscarVersiones(req, res, next) {
    apiService.buscarVersiones(req.body.filtro)
    .then(versiones => res.send(versiones))
    .catch(err => next(err))
}

function insertarVersionConfig(req, res, next) {
    apiService.insertarVersionConfig(req.body)
    .then(id_version => res.send(id_version))
    .catch(err => next(err))
}
/****************************************************/
function buscarModelos(req, res, next) {
    apiService.buscarModelos(req.body.filtro)
    .then(modelo => res.send(modelo))
    .catch(err => next(err))
}

//funcion dudosa
function eliminarAutomotor(req, res, next) {
    apiService.eliminarAutomotor(req.body)
    .then(automotor => res.send(automotor))
    .catch(err => next(err))
}

function buscarMarca(req, res, next) {
    apiService.buscarMarca(req.body.filtro)
    .then(marca => res.send(marca))
    .catch(err => next(err))
}

function ObtenerVersionConfigId(req, res, next) {
    apiService.ObtenerVersionConfigId(req.body)
    .then(automotor => res.send(automotor))
    .catch(err => next(err))
}

function obtenerCatalogo(req, res, next) {
    apiService.obtenerCatalogo(req.body)
    .then(automotor => res.send(automotor))
    .catch(err => next(err))
}


