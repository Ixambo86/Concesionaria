import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const factuService = {
    buscarFacturas,
    buscarFacturaDetalle,
    insertarFacturaPago,
    insertarFactura,
    actualizarFactura,
    insertarFacturaDetalle,
    insertarHistoriaFactura,
    buscarHistoriaFactura
};

function buscarFacturas(filtro) {
    return Axios.put(`${config.apiUrl}/facturas/get`, {filtro}, {headers: authHeader()}).then(handleResponse); 
}

function buscarFacturaDetalle(factura_id) {
    return Axios.put(`${config.apiUrl}/facturas/detalle`, {factura_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarFacturaPago(pago_id, factura_id) {
    return Axios.post(`${config.apiUrl}/facturas/insert_pago`, {pago_id: pago_id, factura_id: factura_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarFactura(factura) {
    return Axios.post(`${config.apiUrl}/facturas/insert`, {cliente_id: factura.cliente_id, tipo: factura.tipo, iva: factura.iva, estado: factura.estado, total: factura.total, saldo: factura.saldo, usuario_id: factura.usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function actualizarFactura(factura) {
    return Axios.put(`${config.apiUrl}/facturas/update`, {factura_id: factura.id, tipo: factura.tipo, estado: factura.estado, saldo: factura.saldo, usuario_id: factura.usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarFacturaDetalle(detalle) {
    return Axios.post(`${config.apiUrl}/facturas/insert_detalle`, {factura_id: detalle.factura_id, item: detalle.item, descripcion: detalle.descripcion, precio: detalle.precio, cantidad: detalle.cantidad, importe: detalle.importe}, {headers: authHeader()}).then(handleResponse); 
}

function insertarHistoriaFactura(factura_id, observacion, usuario_id) {
    return Axios.post(`${config.apiUrl}/facturas/insert_historia`, {factura_id: factura_id, observacion: observacion, usuario_id: usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarHistoriaFactura(factura_id) {
    return Axios.put(`${config.apiUrl}/facturas/historia`, {factura_id}, {headers: authHeader()}).then(handleResponse); 
}

