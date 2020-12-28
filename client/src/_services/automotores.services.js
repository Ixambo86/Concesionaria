import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const automotorService = {
    buscarAutomotores,
    insertarAutomotor,
    buscarCarrocerias,
    buscarTipoMotor,
    buscarTransmision,
    buscarColor,
    buscarVersiones,
    insertarVersionConfig,
    buscarModelos,
    eliminarAutomotor,
    buscarMarca,
    ObtenerVersionConfigId,
    editarAutomotor,
    InsertarNuevoColor,
    obtenerCatalogo,
    buscarSucursales,
    insertarVersion
};

function insertarVersion(id, version, modelo) {
    return Axios.post(`${config.apiUrl}/automotores/insertarVersion`, {id: id, version:version, modelo:modelo}, {headers: authHeader()}).then(handleResponse);
}


function InsertarNuevoColor(id) {
    return Axios.post(`${config.apiUrl}/automotores/InsertarNuevoColor`, {id: id}, {headers: authHeader()}).then(handleResponse);
}

function buscarAutomotores(filtro, cliente_id) {
    return Axios.put(`${config.apiUrl}/automotores/get`, {filtro: filtro, cliente_id: cliente_id}, {headers: authHeader()}).then(handleResponse); 
}

function insertarAutomotor(automotor, version_config_id, usuario) {
    console.log("insertarAutomotor automotores.service" )
    console.log(automotor)
    return Axios.post(`${config.apiUrl}/automotores/insert`, {automotor: automotor, version_config_id:version_config_id, usuario:usuario}, {headers: authHeader()}).then(handleResponse);
}

function editarAutomotor(automotor, version_config_id) {
    console.log("automotor" + automotor);
    return Axios.post(`${config.apiUrl}/automotores/editar`, {automotor: automotor, version_config_id:version_config_id}, {headers: authHeader()}).then(handleResponse);
}

/*************************************************************************/


function buscarCarrocerias() {
    return Axios.put(`${config.apiUrl}/automotores/get_carrocerias`,{}, {headers: authHeader()}).then(handleResponse); 
}

function buscarTipoMotor() {
    return Axios.put(`${config.apiUrl}/automotores/get_tipos_motores`,{}, {headers: authHeader()}).then(handleResponse);
}

function buscarSucursales() {
    return Axios.put(`${config.apiUrl}/automotores/buscarSucursales`,{}, {headers: authHeader()}).then(handleResponse);
}

function buscarTransmision() {
    return Axios.put(`${config.apiUrl}/automotores/get_tipos_transmisiones`,{}, {headers: authHeader()}).then(handleResponse);
}

function buscarColor() {
    return Axios.put(`${config.apiUrl}/automotores/get_colores`,{}, {headers: authHeader()}).then(handleResponse);
}

function insertarVersionConfig(automotor, usuario) {
    return Axios.post(`${config.apiUrl}/automotores/insert_versiones_configuracion`, {automotor: automotor, usuario:usuario}, {headers: authHeader()}).then(handleResponse);
}

function buscarVersiones(filtro) {
    return Axios.put(`${config.apiUrl}/automotores/get_versiones_by_modelo`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse);
}



/*************************************************************************/

function buscarModelos(filtro) {
    return Axios.put(`${config.apiUrl}/modelos/get_by_marca`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse);
}


function eliminarAutomotor(id) {
    return Axios.put(`${config.apiUrl}/automotores/delete`, {id:id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarMarca(filtro) {
    return Axios.put(`${config.apiUrl}/marcas/get`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse);
}


function ObtenerVersionConfigId(automotor) {
    return Axios.post(`${config.apiUrl}/automotores/ObtenerVersionConfigId`, { version_id: automotor.version_id, tipo_motor_id: automotor.tipo_motor_id, color_id: automotor.color_id, }, {headers: authHeader()}).then(handleResponse);
}

function obtenerCatalogo(filtro) {
    return Axios.post(`${config.apiUrl}/automotores/get_catalogo`, { filtro: filtro}, {headers: authHeader()}).then(handleResponse);
}