const express = require('express');
const router = express.Router();
const apiService = require('../services/productosInventario.service');
const authorize = require('_helpers/authorize')
//const Role = require('_helpers/role');

// routes

router.put('/productos_inventario/get_productos', authorize(), buscarProductos);
router.put('/productos_inventario/reservar_producto', authorize(), reservarProducto);
router.put('/productos_inventario/borrar_reserva_producto', authorize(), borrarReservaProducto);
router.put('/productos_inventario/utilizar_reserva_producto', authorize(), utilizarReservaProducto);
router.put('/productos_inventario/get_productos_adicionales', authorize(), buscarProductosAdicionales);
router.put('/productos_inventario/get_categorias_adicionales', authorize(), buscarCategoriasAdicionales);

module.exports = router;

function buscarProductos(req, res, next) {
    apiService.buscarProductos(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function reservarProducto(req, res, next) {
    apiService.reservarProducto(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function borrarReservaProducto(req, res, next) {
    apiService.borrarReservaProducto(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function utilizarReservaProducto(req, res, next) {
    apiService.utilizarReservaProducto(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarProductosAdicionales(req, res, next) {
    apiService.buscarProductosAdicionales(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarCategoriasAdicionales(req, res, next) {
    apiService.buscarCategoriasAdicionales(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

