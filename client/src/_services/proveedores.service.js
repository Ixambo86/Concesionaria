import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const proveedoresService = {
    buscarProveedores,
    buscarTipoDocumentos,
    buscarLocalidades,
    insertarProveedor,
    editarProveedor,
    eliminarProveedor,
    verificarProveedorEliminado,
    buscarIvas,
    buscarProvincias,
    buscarPaises,
    insertarPais,
    insertarProvincia,
    insertarLocalidad
};

function insertarPais(descripcion) {
    console.log("/paises/insertar")
    return Axios.post(`${config.apiUrl}/paises/insertar`, {descripcion:descripcion}, {headers: authHeader()}).then(handleResponse); 
}

function insertarProvincia(descripcion, pais) {
    console.log("/provincias/insertar")
    return Axios.post(`${config.apiUrl}/provincias/insertar`, {descripcion:descripcion, pais:pais}, {headers: authHeader()}).then(handleResponse); 
}

function insertarLocalidad(descripcion, provincia) {
    console.log("/localidades/insertar")
    return Axios.post(`${config.apiUrl}/localidades/insertar`, {descripcion:descripcion, provincia:provincia}, {headers: authHeader()}).then(handleResponse); 
}

function buscarLocalidades(filtro) {
    return Axios.put(`${config.apiUrl}/localidades/get`,{filtro:filtro}, {headers: authHeader()}).then(handleResponse); 
}

function buscarProvincias(filtro) {
    return Axios.put(`${config.apiUrl}/provincias/get`,{filtro:filtro}, {headers: authHeader()}).then(handleResponse); 
}
function buscarPaises() {
    return Axios.put(`${config.apiUrl}/paises/get`,{}, {headers: authHeader()}).then(handleResponse); 
}


function buscarIvas() {
    return Axios.put(`${config.apiUrl}/ivas/get`,{}, {headers: authHeader()}).then(handleResponse); 
}

function buscarProveedores(filtro) {
    return Axios.put(`${config.apiUrl}/proveedores/get`, {filtro: filtro}, {headers: authHeader()}).then(handleResponse); 
}

function verificarProveedorEliminado(documento) {
    return Axios.put(`${config.apiUrl}/proveedores/getDocumento`, {documento:documento}, {headers: authHeader()}).then(handleResponse); 
}

function buscarTipoDocumentos() {
    return Axios.put(`${config.apiUrl}/tipos_documentos/get`,{}, {headers: authHeader()}).then(handleResponse); 
}

function insertarProveedor(id, nombre, apellido, persona_fisica, razon_social,tipo_doc_id , condicion_iva_id,documento, fecha_nac, telefono, email, calle, altura, piso, dpto, localidad, pais, provincia) {
    return Axios.post(`${config.apiUrl}/proveedores/insertar`, {id:id, nombre:nombre, apellido:apellido, persona_fisica:persona_fisica, razon_social,tipo_doc_id:tipo_doc_id, condicion_iva_id:condicion_iva_id, documento:documento, fecha_nac:fecha_nac, telefono:telefono, email:email, calle:calle, altura:altura, piso:piso, dpto:dpto, localidad:localidad, pais:pais, provincia:provincia}, {headers: authHeader()}).then(handleResponse); 
}

function editarProveedor(id, nombre, apellido, persona_fisica, razon_social,tipo_doc_id, condicion_iva_id, documento, fecha_nac, telefono, email, calle, altura, piso, dpto, localidad, pais, provincia) {
    return Axios.post(`${config.apiUrl}/proveedores/editar`, {id:id, nombre:nombre, apellido:apellido, persona_fisica:persona_fisica, razon_social,tipo_doc_id:tipo_doc_id,condicion_iva_id:condicion_iva_id,  documento:documento, fecha_nac:fecha_nac, telefono:telefono, email:email, calle:calle, altura:altura, piso:piso, dpto:dpto, localidad:localidad, pais:pais, provincia:provincia}, {headers: authHeader()}).then(handleResponse); 
}

function eliminarProveedor(id, motivo_eliminado, usuario_id) {
    return Axios.post(`${config.apiUrl}/proveedores/eliminar`, {id:id, motivo_eliminado:motivo_eliminado, usuario_id:usuario_id }, {headers: authHeader()}).then(handleResponse); 
}
