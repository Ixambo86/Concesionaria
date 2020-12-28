import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const modeloService = {
    insertarModelo,
    editarModelo,
    eliminarModelo,
    buscarModelos,
    buscarMarcas,
};

function buscarMarcas(filtro) {
    console.log("holabmarc");
    return Axios.put(`${config.apiUrl}/marcas/get`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse);
}

function buscarModelos(filtro) {
    console.log("holabmodel");
    return Axios.put(`${config.apiUrl}/modelos/get_por_marca`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse);
}


function insertarModelo(usuario_id, descripcion, marca_id) {
    return Axios.post(`${config.apiUrl}/modelo/insertar`, {usuario_id:usuario_id, descripcion:descripcion, marca_id:marca_id}, {headers: authHeader()}).then(handleResponse); 
}

function editarModelo(id, usuario_id, descripcion) {
    return Axios.post(`${config.apiUrl}/modelo/editar`, {id:id, usuario_id:usuario_id, descripcion:descripcion}, {headers: authHeader()}).then(handleResponse); 
}

function eliminarModelo(id) {
    return Axios.post(`${config.apiUrl}/modelo/eliminar`, {id:id}, {headers: authHeader()}).then(handleResponse); 
}
