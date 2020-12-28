import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const clienteService = {
    buscarClientes,
    buscarCliente,
    insertarCliente,
    eliminarCliente,
    verificarClienteEliminado,
    editarCliente,
    buscarPaises,
    buscarProvincias,
    buscarLocalidades,
    buscarIvas
};

function buscarClientes(filtro) {
    return Axios.put(`${config.apiUrl}/clientes/get`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse); 
}

function buscarCliente(filtro) {
    return Axios.put(`${config.apiUrl}/cliente/get`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse); 
}

function insertarCliente(id, nombre, apellido, genero, persona_fisica, razon_social, ci_id, documento, fecha_nac, telefono, email, calle, altura, piso, dpto, localidad, pais, prov) {
    return Axios.post(`${config.apiUrl}/clientes/insertar`, {id:id, nombre:nombre, apellido:apellido, genero:genero, persona_fisica:persona_fisica, razon_social:razon_social, ci_id:ci_id, documento:documento, fecha_nac:fecha_nac, telefono:telefono, email:email, calle:calle, altura:altura, piso:piso, dpto:dpto, localidad:localidad, pais:pais, prov:prov}, {headers: authHeader()}).then(handleResponse); 
}

function editarCliente(id, nombre, apellido, genero, persona_fisica, razon_social,ci_id, documento, fecha_nac, telefono, email, calle, altura, piso, dpto, localidad, pais, prov) {
    return Axios.post(`${config.apiUrl}/clientes/editar`, {id:id, nombre:nombre, apellido:apellido, genero:genero, persona_fisica:persona_fisica, razon_social:razon_social, ci_id:ci_id, documento:documento, fecha_nac:fecha_nac, telefono:telefono, email:email, calle:calle, altura:altura, piso:piso, dpto:dpto, localidad:localidad, pais:pais, prov:prov}, {headers: authHeader()}).then(handleResponse); 
}

function eliminarCliente(id, motivo_eliminado, usuario_id) {
    return Axios.post(`${config.apiUrl}/clientes/eliminar`, {id:id, motivo_eliminado:motivo_eliminado, usuario_id:usuario_id }, {headers: authHeader()}).then(handleResponse); 
}

function verificarClienteEliminado(documento) {
    return Axios.put(`${config.apiUrl}/clientes/eliminados`, {documento:documento}, {headers: authHeader()}).then(handleResponse); 
}


function buscarPaises() {
    return Axios.get(`${config.apiUrl}/clientes/paises`, {headers: authHeader()}).then(handleResponse); 
}

function buscarProvincias(pais) {
    return Axios.put(`${config.apiUrl}/clientes/provincia`, {pais:pais}, {headers: authHeader()}).then(handleResponse); 
}

function buscarLocalidades(provincia) {
    return Axios.put(`${config.apiUrl}/clientes/localidad`, {provincia:provincia}, {headers: authHeader()}).then(handleResponse); 
}

function buscarIvas() {
    return Axios.get(`${config.apiUrl}/clientes/iva`, {headers: authHeader()}).then(handleResponse); 
}