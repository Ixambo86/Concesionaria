import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const pedidosService = {
    buscarPedidos,
    eliminarPedido,
    actualizarPedido,
    insertarPedido,
    buscarProductosPedido,
    borrarProductosPedido,
    insertarProductosPedido,
    insertarHistoriaPedido,
    buscarHistoriaPedido,
    asignarFactura,
    buscarDocumentosPedido,
    insertarDocumentosPedido,
    actualizarDocumentosPedido,
    asignarAutomotorCliente,
    obtenerPedidosSinAutomotor,
    asignarAutomotorPedido
};

function buscarPedidos(filtro, pedido_id) {
    return Axios.put(`${config.apiUrl}/pedidos/get`, {filtro: filtro, pedido_id: pedido_id}, {headers: authHeader()}).then(handleResponse); 
}

function actualizarPedido(pedido) {
    return Axios.put(`${config.apiUrl}/pedidos/update`, {pedido_id: pedido.id, nro_pedido: pedido.nro_pedido, cliente_id: pedido.cliente_id, automotor_id: pedido.automotor_id, importe: pedido.importe, estado: pedido.estado, usuario_id: pedido.usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function eliminarPedido(pedido_id) {
    return Axios.put(`${config.apiUrl}/pedidos/delete`, {pedido_id: pedido_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarPedido(pedido, usuario_id) {
    return Axios.post(`${config.apiUrl}/pedidos/insert`, {pedido_id: pedido.pedido_id, cliente_id: pedido.cliente_id, version_config_id: pedido.automotor_version_config_id, automotor_id: pedido.automotor_id, bonificacion: pedido.bonificacion, importe: pedido.importe, estado: pedido.estado, usuario_id: usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarProductosPedido(pedido_id) {
    return Axios.put(`${config.apiUrl}/pedidos/get_productos`, {pedido_id: pedido_id}, {headers: authHeader()}).then(handleResponse); 
}

function borrarProductosPedido(pedido_id) {
    return Axios.put(`${config.apiUrl}/pedidos/delete_productos`, {pedido_id: pedido_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarProductosPedido(pedido_id, item, producto, precio, cantidad, importe, nro_lote) {
    return Axios.post(`${config.apiUrl}/pedidos/insert_productos`, {pedido_id: pedido_id, item: item, producto_id: producto, precio:precio, cantidad: cantidad, importe: importe, nro_lote: nro_lote}, {headers: authHeader()}).then(handleResponse); 
}

function insertarHistoriaPedido(pedido_id, observacion, usuario_id) {
    return Axios.post(`${config.apiUrl}/pedidos/insert_historia`, {pedido_id: pedido_id, observacion: observacion, usuario_id: usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarHistoriaPedido(pedido_id) {
    return Axios.put(`${config.apiUrl}/pedidos/get_historia`, {pedido_id: pedido_id}, {headers: authHeader()}).then(handleResponse); 
}

function asignarFactura(pedido_id, factura_id) {
    return Axios.put(`${config.apiUrl}/pedidos/asignar_factura`, {pedido_id: pedido_id, factura_id: factura_id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarDocumentosPedido(pedido_id) {
    return Axios.put(`${config.apiUrl}/pedidos/get_documentos`, {pedido_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarDocumentosPedido(pedido_id, version_config_id, usuario_id) {
    return Axios.post(`${config.apiUrl}/pedidos/insert_documentos`, {pedido_id: pedido_id, version_config_id: version_config_id, usuario_id: usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function actualizarDocumentosPedido(pedido_id, documento) {
    return Axios.put(`${config.apiUrl}/pedidos/update_documentos`, {pedido_id: pedido_id, documento_id: documento.id, entregado: documento.entregado}, {headers: authHeader()}).then(handleResponse); 
}

function asignarAutomotorCliente(automotor_id, cliente_id) {
    return Axios.put(`${config.apiUrl}/pedidos/asignar_automotor_cliente`, {automotor_id, cliente_id}, {headers: authHeader()}).then(handleResponse); 
}

function obtenerPedidosSinAutomotor(version_config_id) {
    return Axios.put(`${config.apiUrl}/pedidos/obtener_pedidos_sin_automotor`, {version_config_id}, {headers: authHeader()}).then(handleResponse); 
}

function asignarAutomotorPedido(automotor_id, pedido_id) {
    return Axios.put(`${config.apiUrl}/pedidos/asignar_automotor_pedido`, {automotor_id, pedido_id}, {headers: authHeader()}).then(handleResponse); 
}