const express = require('express');
const router = express.Router();
const apiService = require('../services/proveedores.service');
const authorize = require('_helpers/authorize')


// routes
router.put('/proveedores/get', authorize(), buscarProveedores);
router.put('/tipos_documentos/get', authorize(), buscarTipoDocumentos);
router.put('/localidades/get', authorize(), buscarLocalidades);
router.put('/provincias/get', authorize(), buscarProvincias);
router.put('/paises/get', authorize(), buscarPaises);
router.post('/proveedores/insertar', authorize(), insertarProveedor);
router.post('/proveedores/editar', authorize(), editarProveedor);
router.post('/proveedores/eliminar', authorize(), eliminarProveedor);
router.put('/proveedores/getDocumento', authorize(), verificarProveedorEliminado);
router.put('/ivas/get', authorize(), buscarIvas);
router.post('/paises/insertar', authorize(), insertarPais);
router.post('/provincias/insertar', authorize(), insertarProvincia);
router.post('/localidades/insertar', authorize(), insertarLocalidad);

module.exports = router;

function buscarLocalidades(req, res, next) {
    apiService.buscarLocalidades(req.body.filtro)
    .then(localidades => res.send(localidades))
    .catch(err => next(err))
}

function insertarPais(req, res, next) {
    apiService.insertarPais(req.body)
    .then(pais => res.send(pais))
    .catch(err => next(err))
}

function insertarProvincia(req, res, next) {
    apiService.insertarProvincia(req.body)
    .then(provincia => res.send(provincia))
    .catch(err => next(err))
}

function insertarLocalidad(req, res, next) {
    apiService.insertarLocalidad(req.body)
    .then(Localidad => res.send(Localidad))
    .catch(err => next(err))
}

function buscarProvincias(req, res, next) {
    apiService.buscarProvincias(req.body.filtro)
    .then(provincias => res.send(provincias))
    .catch(err => next(err))
}

function buscarPaises(req, res, next) {
    apiService.buscarPaises()
    .then(paises => res.send(paises))
    .catch(err => next(err))
}



function buscarIvas(req, res, next) {
    apiService.buscarIvas()
    .then(ivas => res.send(ivas))
    .catch(err => next(err))
}

function verificarProveedorEliminado(req, res, next) {
    apiService.verificarProveedorEliminado(req.body)
    .then(documento => res.send(documento))
    .catch(err => next(err))
}

function buscarProveedores(req, res, next) {
    apiService.buscarProveedores(req.body.filtro)
    .then(proveedor => res.send(proveedor))
    .catch(err => next(err))
}

function buscarTipoDocumentos(req, res, next) {
    apiService.buscarTipoDocumentos()
    .then(documento => res.send(documento))
    .catch(err => next(err))
}


function insertarProveedor(req, res, next) {
    apiService.insertarProveedor(req.body)
    .then(proveedor => res.send(proveedor))
    .catch(err => next(err))
}

function editarProveedor(req, res, next) {
    apiService.editarProveedor(req.body)
    .then(proveedor => res.send(proveedor))
    .catch(err => next(err))
}

function eliminarProveedor(req, res, next) {
    apiService.eliminarProveedor(req.body)
    .then(proveedor => res.send(proveedor))
    .catch(err => next(err))
}

