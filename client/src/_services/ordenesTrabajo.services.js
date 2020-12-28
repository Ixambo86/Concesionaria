import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const ordenesTrabajoService = {
    buscarOrdenes,
    eliminarOrden,
    actualizarOrden,
    insertarOrden,
    buscarProductosOrden,
    borrarProductosOrden,
    insertarProductosOrden,
    buscarServiciosOrden,
    insertarServiciosOrden,
    insertarHistoriaOrden,
    buscarHistoriaOrden,
    asignarFactura,
    obtenerEstados
};

function buscarOrdenes(filtro, orden_id) {
    return Axios.put(`${config.apiUrl}/ordenes_trabajo/get`, {filtro: filtro, orden_id: orden_id}, {headers: authHeader()}).then(handleResponse); 
}

function actualizarOrden(orden) {
    return Axios.put(`${config.apiUrl}/ordenes_trabajo/update`, {orden_id: orden.id, nro_orden: orden.nro_orden, cliente_id: orden.cliente_id, automotor_id: orden.automotor_id, importe: orden.importe, estado: orden.estado}, {headers: authHeader()}).then(handleResponse); 
}

function eliminarOrden(orden_id) {
    return Axios.put(`${config.apiUrl}/ordenes_trabajo/delete`, {orden_id: orden_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarOrden(orden, usuario_id) {
    return Axios.post(`${config.apiUrl}/ordenes_trabajo/insert`, {nro_orden: orden.nro_orden, cliente_id: orden.cliente_id, automotor_id: orden.automotor_id, importe: orden.importe, estado: orden.estado, cantidad_modulos: orden.cantidad_modulos, fecha_minima_turno: orden.fecha_minima_turno, usuario_id: usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarProductosOrden(orden_id) {
    return Axios.put(`${config.apiUrl}/ordenes_trabajo/get_productos`, {orden_id: orden_id}, {headers: authHeader()}).then(handleResponse); 
}

function borrarProductosOrden(orden_id) {
    return Axios.put(`${config.apiUrl}/ordenes_trabajo/delete_productos`, {orden_id: orden_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarProductosOrden(orden_id, item, producto, cantidad, precio, nro_lote) {
    return Axios.post(`${config.apiUrl}/ordenes_trabajo/insert_productos`, {orden_id: orden_id, item: item, producto_id: producto, cantidad: cantidad, importe: precio, nro_lote: nro_lote}, {headers: authHeader()}).then(handleResponse); 
}

function buscarServiciosOrden(orden_id) {
    return Axios.put(`${config.apiUrl}/ordenes_trabajo/get_servicios`, {orden_id: orden_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarServiciosOrden(orden_id, item, servicio, cantidad, importe) {
    return Axios.post(`${config.apiUrl}/ordenes_trabajo/insert_servicios`, {orden_id: orden_id, item: item, servicio_id: servicio, cantidad: cantidad, importe: importe}, {headers: authHeader()}).then(handleResponse); 
}

function insertarHistoriaOrden(orden_id, observacion, usuario_id) {
    return Axios.post(`${config.apiUrl}/ordenes_trabajo/insert_historia`, {orden_id: orden_id, observacion: observacion, usuario_id: usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarHistoriaOrden(orden_id) {
    return Axios.put(`${config.apiUrl}/ordenes_trabajo/get_historia`, {orden_id: orden_id}, {headers: authHeader()}).then(handleResponse); 
}

function asignarFactura(orden_id, factura_id) {
    return Axios.put(`${config.apiUrl}/ordenes_trabajo/asignar_factura`, {orden_id: orden_id, factura_id: factura_id}, {headers: authHeader()}).then(handleResponse); 
}

function obtenerEstados() {
    return Axios.get(`${config.apiUrl}/ordenes_trabajo/get_estados`, {headers: authHeader()}).then(handleResponse); 
}
