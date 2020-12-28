import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const documentacionService = {
    buscarDocumentos,
    insertarDocumento,
    actualizarDocumento,
    eliminarDocumento
};

function buscarDocumentos(filtro, pedido_id) {
    return Axios.put(`${config.apiUrl}/documentos/get`, {filtro}, {headers: authHeader()}).then(handleResponse); 
}

function insertarDocumento(documento, usuario_id) {
    return Axios.post(`${config.apiUrl}/documentos/insert`, {descripcion: documento.descripcion, exigido_a: documento.exigido_a, fecha_desde: documento.fecha_desde, fecha_hasta: documento.fecha_hasta, usuario_id: usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function actualizarDocumento(documento, usuario_id) {
    return Axios.put(`${config.apiUrl}/documentos/update`, {id: documento.id, descripcion: documento.descripcion, exigido_a: documento.exigido_a, fecha_desde: documento.fecha_desde, fecha_hasta: documento.fecha_hasta, usuario_id: usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function eliminarDocumento(documento_id, usuario_id) {
    return Axios.put(`${config.apiUrl}/documentos/delete`, {documento_id, usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

