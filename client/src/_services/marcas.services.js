import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const marcaService = {
    insertarMarca,
    editarMarca,
    eliminarMarca,
    buscarMarcas,
    buscarMarcasyModelos
};

function buscarMarcas(filtro) {
    return Axios.put(`${config.apiUrl}/marcas/get`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse);
}

function buscarMarcasyModelos(filtro) {

    return Axios.put(`${config.apiUrl}/MarcasyModelos/get`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse);
}

function insertarMarca(usuario_id, descripcion) {
    return Axios.post(`${config.apiUrl}/marca/insertar`, {usuario_id:usuario_id, descripcion:descripcion}, {headers: authHeader()}).then(handleResponse); 
}

function editarMarca(id, usuario_id, descripcion) {
    return Axios.post(`${config.apiUrl}/marca/editar`, {id:id, usuario_id:usuario_id, descripcion:descripcion}, {headers: authHeader()}).then(handleResponse); 
}

function eliminarMarca(id) {
    console.log("Estoy en eliminarservicio");
    return Axios.post(`${config.apiUrl}/marca/eliminar`, {id:id}, {headers: authHeader()}).then(handleResponse); 
}

