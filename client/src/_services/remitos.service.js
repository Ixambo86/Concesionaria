import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const remitosService = {
    buscarIdProductos,
    insertarRemitoInventario,
    modificarStock,
    buscarRemitos,
    insertarRemito,
    insertarRemitoDetalle,
    remitoYaCargado,
    insertarRemitoEnOrdenCompra,
    buscarOrdenesCompra,
    EnviarMailValidacionesRemito,
    ObtenerInfoProducto,
    insertarCostoEnProducto,
    insertarOrdenCompra,
    obtenerRemitoProductos,
    pagarRemito,
    asignarNroLoteOTP,
    asignarNroLotePED
};

function insertarOrdenCompra(nro_orden, remito, codigo, usuario) {
    console.log("estoy en insertar orden_compra 2")
    return Axios.post(`${config.apiUrl}/remitos/insertarOrdenCompra`, {nro_orden:nro_orden, remito:remito, codigo:codigo, usuario:usuario}, {headers: authHeader()}).then(handleResponse); 
}

function insertarCostoEnProducto(SKU, costo) {
    return Axios.post(`${config.apiUrl}/remitos/insertarCostoEnProducto`, {SKU:SKU, costo:costo}, {headers: authHeader()}).then(handleResponse); 
}

function ObtenerInfoProducto(orden_compra) {
    return Axios.put(`${config.apiUrl}/remitos/ValidarCostoProducto`, {orden_compra}, {headers: authHeader()}).then(handleResponse); 
}

function EnviarMailValidacionesRemito(nro_remito, cadenaCostoBajo, cadenaNoExisteEnOrden, cadenaNoExisteEnRemito, usuario_id, ordenNoExisteMail) {
    console.log("estoy en enviar EnviarMailValidacionesRemito remito.services")
    return Axios.post(`${config.apiUrl}/remitos/EnviarMailValidacionesRemito`, {nro_remito:nro_remito, cadenaCostoBajo:cadenaCostoBajo, cadenaNoExisteEnOrden:cadenaNoExisteEnOrden, cadenaNoExisteEnRemito:cadenaNoExisteEnRemito, usuario_id:usuario_id, ordenNoExisteMail:ordenNoExisteMail}, {headers: authHeader()}).then(handleResponse);
}

function buscarOrdenesCompra(nro_orden) {
    return Axios.put(`${config.apiUrl}/remitos/buscarOrdenesCompra`, {nro_orden:nro_orden}, {headers: authHeader()}).then(handleResponse); 
}

function insertarRemitoEnOrdenCompra(remito_id, nro_orden) {
    return Axios.post(`${config.apiUrl}/remitos/insertarRemitoEnOrdenCompra`, {remito_id:remito_id, nro_orden:nro_orden}, {headers: authHeader()}).then(handleResponse); 
}

function buscarIdProductos(NroLote, Descripcion, SKU) {
    return Axios.put(`${config.apiUrl}/remitos/get_productoId_nroLote`, {NroLote:NroLote, Descripcion:Descripcion, SKU}, {headers: authHeader()}).then(handleResponse); 
}

function remitoYaCargado(remito) {
    return Axios.put(`${config.apiUrl}/remitos/remitoYaCargado`, {remito:remito}, {headers: authHeader()}).then(handleResponse); 
}

function insertarRemito(remito, SKU, Descripcion, nro_orden, usuario_id) {
    
    return Axios.post(`${config.apiUrl}/remitos/insertarRemito`, {remito:remito, SKU:SKU, Descripcion:Descripcion, nro_orden:nro_orden, usuario_id:usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarRemitoInventario(SKU, descripcion, nroLote, stock, fecha_vencimiento, usuario_id) {
    return Axios.post(`${config.apiUrl}/remitos/insertarInventario`, {SKU:SKU, descripcion:descripcion, nroLote:nroLote, stock:stock, fecha_vencimiento:fecha_vencimiento, usuario_id:usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function modificarStock(producto_id, nro_lote, nuevoStock, usuario_id) {
    return Axios.post(`${config.apiUrl}/remitos/modificarStock`, {producto_id:producto_id, nro_lote:nro_lote, nuevoStock:nuevoStock, usuario_id:usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarRemitos(filtro) {
    return Axios.put(`${config.apiUrl}/remitos/buscarRemitos`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse); 
}

function obtenerRemitoProductos(remito_id) {
    return Axios.put(`${config.apiUrl}/remitos/obtener_remito_productos`, {remito_id}, {headers: authHeader()}).then(handleResponse); 
}

function pagarRemito(remito_id, usuario_id) {
    return Axios.put(`${config.apiUrl}/remitos/pagar_remito`, {remito_id, usuario_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarRemitoDetalle(remito_id, item, SKU, nro_lote, costo, cantidad) {
    
    return Axios.post(`${config.apiUrl}/remitos/insertar_remito_detalle`, {remito_id, item, SKU, nro_lote, costo, cantidad}, {headers: authHeader()}).then(handleResponse); 
}

function asignarNroLoteOTP(nro_lote, SKU) {
    return Axios.put(`${config.apiUrl}/remitos/asignar_nro_lote_otp`, {nro_lote, SKU}, {headers: authHeader()}).then(handleResponse); 
}

function asignarNroLotePED(nro_lote, SKU) {
    return Axios.put(`${config.apiUrl}/remitos/asignar_nro_lote_ped`, {nro_lote, SKU}, {headers: authHeader()}).then(handleResponse); 
}
