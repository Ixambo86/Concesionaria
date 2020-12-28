import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const ordenesCompraService = {
    generarOrdenCompra,
    buscarOrdenes,
    eliminarOrden,
    actualizarOrden,
    insertarOrden,
    buscarProductosOrden,
    insertarProductosOrden,
    insertarHistoriaOrden,
    buscarHistoriaOrden
};

function generarOrdenCompra(producto_id, sucursal_id) {
    return Axios.put(`${config.apiUrl}/ordenes_compra/generate`, {producto_id: producto_id, sucursal_id: sucursal_id}, {headers: authHeader()}).then(handleResponse); 
}


function buscarOrdenes(filtro, orden_id) {
    return Axios.put(`${config.apiUrl}/ordenes_compra/get`, {filtro: filtro, orden_id: orden_id}, {headers: authHeader()}).then(handleResponse); 
}

function actualizarOrden(orden) {
    return Axios.put(`${config.apiUrl}/ordenes_compra/update`, {orden_id: orden.id, proveedor_id: orden.proveedor_id, estado: orden.estado, usuario_id: orden.usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function eliminarOrden(orden_id) {
    return Axios.put(`${config.apiUrl}/ordenes_compra/delete`, {orden_id: orden_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarOrden(orden, usuario_id) {
    return Axios.post(`${config.apiUrl}/ordenes_compra/insert`, {proveedor_id: orden.proveedor_id, estado: orden.estado, usuario_id: usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarProductosOrden(orden_id) {
    return Axios.put(`${config.apiUrl}/ordenes_compra/get_productos`, {orden_id: orden_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarProductosOrden(orden_id, item, producto_id, cantidad) {
    return Axios.post(`${config.apiUrl}/ordenes_compra/insert_productos`, {orden_id: orden_id, item: item, producto_id: producto_id, cantidada: cantidad}, {headers: authHeader()}).then(handleResponse); 
}

function insertarHistoriaOrden(orden_id, observacion, usuario_id) {
    return Axios.post(`${config.apiUrl}/ordenes_compra/insert_historia`, {orden_id: orden_id, observacion: observacion, usuario_id: usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarHistoriaOrden(orden_id) {
    return Axios.put(`${config.apiUrl}/ordenes_compra/get_historia`, {orden_id: orden_id}, {headers: authHeader()}).then(handleResponse); 
}
