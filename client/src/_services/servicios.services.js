import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const servicioService = {
    buscarServicios,
    obtenerProductos,
    buscarServicios2,
    insertarServicio,
    editarServicio,
    buscarCategorias,
    eliminarServicio,
    insertarCategoria
};

function buscarServicios(filtro) {
    return Axios.put(`${config.apiUrl}/servicios/get`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse); 
}

function obtenerProductos(automotor_id, servicios) {
    return Axios.put(`${config.apiUrl}/servicios/get_producto`, {servicios_id: servicios, automotor_id: automotor_id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarServicios2(filtro) {
    return Axios.put(`${config.apiUrl}/servicios2/get`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse); 
}

function insertarCategoria(id, categoria) {

    return Axios.post(`${config.apiUrl}/servicios/insertarCategoria`, {id:id, categoria:categoria}, {headers: authHeader()}).then(handleResponse); 
}

function insertarServicio(id, categoria_id, descripcion, precio, cantidad_modulos) {

    return Axios.post(`${config.apiUrl}/servicios/insertar`, {id:id, categoria_id:categoria_id, descripcion:descripcion, precio:precio,  cantidad_modulos:cantidad_modulos}, {headers: authHeader()}).then(handleResponse); 
}

function editarServicio(id, usuario_id, categoria_id, descripcion, precio, cantidad_modulos) {
    return Axios.post(`${config.apiUrl}/servicios/editar`, {id:id, usuario_id:usuario_id, categoria_id:categoria_id, descripcion:descripcion, precio:precio, cantidad_modulos:cantidad_modulos}, {headers: authHeader()}).then(handleResponse); 
}

function buscarCategorias() {
    return Axios.put(`${config.apiUrl}/categorias_servicio/get`,{}, {headers: authHeader()}).then(handleResponse); 
}


function eliminarServicio(id) {
    return Axios.post(`${config.apiUrl}/servicio/eliminar`, {id:id}, {headers: authHeader()}).then(handleResponse); 
}