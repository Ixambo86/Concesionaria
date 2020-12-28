import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const sucursalesService = {
    buscarSucursales,
    insertarSucursal,
    editarSucursal,
    eliminarSucursal,
    InsertarNuevaLicalidad

};


function InsertarNuevaLicalidad(localidad) {
    return Axios.post(`${config.apiUrl}/localidad/InsertarNuevaLicalidad`, {localidad: localidad}, {headers: authHeader()}).then(handleResponse);
}

function buscarSucursales(filtro) {
    return Axios.put(`${config.apiUrl}/sucursales/get`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse); 
}

function insertarSucursal(nombre, calle, altura, localidad_id, pais_id, provincia_id, cant_mecanicos, telefono, email) {
    return Axios.post(`${config.apiUrl}/sucursales/insertar`, {nombre:nombre, calle:calle, altura:altura, localidad_id:localidad_id, pais_id:pais_id, provincia_id:provincia_id, cant_mecanicos:cant_mecanicos, telefono:telefono, email:email}, {headers: authHeader()}).then(handleResponse); 
}

function editarSucursal(id, nombre, calle, altura, localidad_id, pais_id, provincia_id, cant_mecanicos, telefono, email) {  
    return Axios.post(`${config.apiUrl}/sucursales/editar`, {id:id, nombre:nombre, calle:calle, altura:altura, localidad_id:localidad_id ,pais_id:pais_id, provincia_id:provincia_id, cant_mecanicos:cant_mecanicos, telefono:telefono , email:email}, {headers: authHeader()}).then(handleResponse); 
}

function eliminarSucursal(id) {
    return Axios.post(`${config.apiUrl}/sucursales/eliminar`, {id:id}, {headers: authHeader()}).then(handleResponse); 
}