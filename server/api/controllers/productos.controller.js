const express = require('express');
const router = express.Router();
const apiService = require('../services/productos.service');
const authorize = require('_helpers/authorize')


// routes
router.put('/productos/get', authorize(), buscarProductos);
router.put('/marcas_producto/get', authorize(), buscarMarcas);
router.put('/categorias_producto/get', authorize(), buscarCategorias);
router.put('/proveedores_producto/get', authorize(), buscarProveedores);
router.post('/productos/insertar', authorize(), insertarProducto);
router.post('/productos/insertarCategoria', authorize(), insertarCategoria);
router.post('/productos/editar', authorize(), editarProducto);
router.post('/producto/eliminar', authorize(), eliminarProducto);

module.exports = router;

function insertarCategoria(req, res, next) {
    apiService.insertarCategoria(req.body)
    .then(producto => res.send(producto))
    .catch(err => next(err))
}

function buscarProductos(req, res, next) {
    apiService.buscarProductos(req.body.filtro)
    .then(proveedor => res.send(proveedor))
    .catch(err => next(err))
}

function buscarMarcas(req, res, next) {
    apiService.buscarMarcas()
    .then(marcas => res.send(marcas))
    .catch(err => next(err))
}

function buscarCategorias(req, res, next) {
    apiService.buscarCategorias()
    .then(categorias => res.send(categorias))
    .catch(err => next(err))
}

function buscarProveedores(req, res, next) {
    apiService.buscarProveedores()
    .then(proveedores => res.send(proveedores))
    .catch(err => next(err))
}

function insertarProducto(req, res, next) {
    apiService.insertarProducto(req.body)
    .then(producto => res.send(producto))
    .catch(err => next(err))
}

function editarProducto(req, res, next) {
    apiService.editarProducto(req.body)
    .then(producto => res.send(producto))
    .catch(err => next(err))
}

function eliminarProducto(req, res, next) {
    apiService.eliminarProducto(req.body)
    .then(producto => res.send(producto))
    .catch(err => next(err))
}