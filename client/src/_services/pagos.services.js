import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const pagosService = {
    buscarMediosPago,
    buscarPagos,
    obtenerPago,
    obtenerDetallePago,
    insertarPago,
    insertarPagoDetalle
};

function buscarMediosPago() {
    return Axios.get(`${config.apiUrl}/pagos/medios_pago`, {headers: authHeader()}).then(handleResponse); 
}

function buscarPagos(filtro, factura_id) {
    return Axios.put(`${config.apiUrl}/pagos/get`, {filtro: filtro, factura_id: factura_id}, {headers: authHeader()}).then(handleResponse); 
}

function obtenerPago(pago_id) {
    return Axios.put(`${config.apiUrl}/pagos/pago`, {pago_id}, {headers: authHeader()}).then(handleResponse); 
}

function obtenerDetallePago(pago_id) {
    return Axios.put(`${config.apiUrl}/pagos/detalle`, {pago_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarPago(pago) {
    return Axios.post(`${config.apiUrl}/pagos/insert`, {cliente_id: pago.cliente_id, importe: pago.importe, concepto: pago.concepto, usuario_id: pago.usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarPagoDetalle(detalle) {
    return Axios.post(`${config.apiUrl}/pagos/insert_detalle`, {pago_id: detalle.pago_id, medio_pago_id: detalle.medio_pago_id, nro_transaccion: detalle.nro_transaccion, importe: detalle.importe}, {headers: authHeader()}).then(handleResponse); 
}

