const express = require('express');
const router = express.Router();
const apiService = require('../services/pedidos.service');
const authorize = require('_helpers/authorize')
//const Role = require('_helpers/role');

// routes
router.put('/pedidos/get', authorize(), buscarPedidos);
router.put('/pedidos/update', authorize(), actualizarPedido);
router.put('/pedidos/delete', authorize(), eliminarPedido);
router.post('/pedidos/insert', authorize(), insertarPedido);
router.put('/pedidos/get_productos', authorize(), buscarProductosPedido);
router.put('/pedidos/delete_productos', authorize(), borrarProductosPedido);
router.post('/pedidos/insert_productos', authorize(), insertarProductosPedido);
router.post('/pedidos/insert_historia', authorize(), insertarHistoriaPedido);
router.put('/pedidos/get_historia', authorize(), buscarHistoriaPedido);
router.put('/pedidos/asignar_factura', authorize(), asignarFactura);
router.put('/pedidos/get_documentos', authorize(), buscarDocumentosPedido);
router.post('/pedidos/insert_documentos', authorize(), insertarDocumentosPedido);
router.put('/pedidos/update_documentos', authorize(), actualizarDocumentosPedido);
router.put('/pedidos/asignar_automotor_cliente', authorize(), asignarAutomotorCliente);
router.put('/pedidos/obtener_pedidos_sin_automotor', authorize(), obtenerPedidosSinAutomotor);
router.put('/pedidos/asignar_automotor_pedido', authorize(), asignarAutomotorPedido);


module.exports = router;

function buscarPedidos(req, res, next) {
    apiService.buscarPedidos(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function actualizarPedido(req, res, next) {
    apiService.actualizarPedido(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function eliminarPedido(req, res, next) {
    apiService.eliminarPedido(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function insertarPedido(req, res, next) {
    apiService.insertarPedido(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarProductosPedido(req, res, next) {
    apiService.buscarProductosPedido(req.body)
    .then(producto => res.send(producto))
    .catch(err => next(err))
}

function borrarProductosPedido(req, res, next) {
    apiService.borrarProductosPedido(req.body)
    .then(producto => res.send(producto))
    .catch(err => next(err))
}

function insertarProductosPedido(req, res, next) {
    apiService.insertarProductosPedido(req.body)
    .then(producto => res.send(producto))
    .catch(err => next(err))
}

function insertarHistoriaPedido(req, res, next) {
    apiService.insertarHistoriaPedido(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}

function buscarHistoriaPedido(req, res, next) {
    apiService.buscarHistoriaPedido(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}

function asignarFactura(req, res, next) {
    apiService.asignarFactura(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}
function buscarDocumentosPedido(req, res, next) {
    apiService.buscarDocumentosPedido(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}

function insertarDocumentosPedido(req, res, next) {
    apiService.insertarDocumentosPedido(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}

function actualizarDocumentosPedido(req, res, next) {
    apiService.actualizarDocumentosPedido(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}

function asignarAutomotorCliente(req, res, next) {
    apiService.asignarAutomotorCliente(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}

function obtenerPedidosSinAutomotor(req, res, next) {
    apiService.obtenerPedidosSinAutomotor(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}

function asignarAutomotorPedido(req, res, next) {
    apiService.asignarAutomotorPedido(req.body)
    .then(historia => res.send(historia))
    .catch(err => next(err))
}