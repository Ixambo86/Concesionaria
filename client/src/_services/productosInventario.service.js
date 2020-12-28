import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const productosInventarioService = {
    reservarProducto,
    borrarReservaProducto,
    buscarProductos,
    utilizarReservaProducto,
    buscarProductosAdicionales,
    buscarCategoriasAdicionales
};
function buscarProductos(filtro) {
    return Axios.put(`${config.apiUrl}/productos_inventario/get_productos`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse); 
}

function reservarProducto(producto_id, cantidad, nro_lote) {
    return Axios.put(`${config.apiUrl}/productos_inventario/reservar_producto`, {producto_id: producto_id, cantidad: cantidad, nro_lote: nro_lote}, {headers: authHeader()}).then(handleResponse); 
}

function borrarReservaProducto(producto_id, cantidad, nro_lote) {
    return Axios.put(`${config.apiUrl}/productos_inventario/borrar_reserva_producto`, {producto_id: producto_id, cantidad: cantidad, nro_lote: nro_lote}, {headers: authHeader()}).then(handleResponse); 
}

function utilizarReservaProducto(producto_id, cantidad, nro_lote) {
    return Axios.put(`${config.apiUrl}/productos_inventario/utilizar_reserva_producto`, {producto_id: producto_id, cantidad: cantidad, nro_lote: nro_lote}, {headers: authHeader()}).then(handleResponse); 
}

function buscarProductosAdicionales(automotor_id, version_config_id, categoria_id) {
    return Axios.put(`${config.apiUrl}/productos_inventario/get_productos_adicionales`, {automotor_id: automotor_id, version_config_id: version_config_id, categoria_id: categoria_id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarCategoriasAdicionales(automotor_id) {
    return Axios.put(`${config.apiUrl}/productos_inventario/get_categorias_adicionales`, {automotor_id: automotor_id}, {headers: authHeader()}).then(handleResponse); 
}

