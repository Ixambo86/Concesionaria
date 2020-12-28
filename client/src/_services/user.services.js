import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const userService = {
    getAll,
    getById,
    getRoles,
    agregarUsuario,
    setRolesUsuario,
    deleteRolesUsuario,
    getRolesUsuario,
    solicitudRecu,
    eliminarUser,
    actualizarUser,
    validateResetToken,
    resetPassword,
    buscarTotalUsuarios,
    buscarUsuariosActivos,
    buscarUsuariosEliminados,
    buscarUsuariosBloqueados,
    buscarUsuariosAdministradores,
    buscarUsuariosMecanicos,
    buscarUsuariosVendedores,
    buscarUsuariosSupervisores,
    buscarUsuariosAdministrativos,
    buscarUsuariosGerentes,

    buscarCantidadVentas,
    buscarCantidadReservas,
    buscarVentasFinalizadas,
    buscarVentasCanceladas,
    buscarUltimaVenta,
    buscarVentasIniciadas,
    
    buscarVentaPromedio,
    buscarIngresosTotales,
    buscarEgresosTotales,
    buscarVentasVendedor,

    buscarOrdenesTotales,
    buscarOrdenesFinalizadas,
    buscarOrdenesCanceladas,
    buscarUltimaOrden,
    buscarOrdenesIniciadas,
    buscarOrdenesPendientes,
    buscarOrdenesFacturadas

};

function getAll(filtro) {
    return Axios.put(`${config.apiUrl}/get_usuarios`, {filtro}, {headers: authHeader()}).then(handleResponse);
}

function getById(id) {
    return Axios.get(`${config.apiUrl}/${id}`, {headers: authHeader()}).then(handleResponse);
}

function getRoles() {
    return Axios.get(`${config.apiUrl}/get_roles`, {headers: authHeader()}).then(handleResponse);
}

function agregarUsuario(datos){
    return Axios.post(`${config.apiUrl}/agregar_usuario`, {datos}, {headers: authHeader()}).then(handleResponse);
}

function setRolesUsuario(id, checked) {
    return Axios.post(`${config.apiUrl}/set_roles_usuario`, {id, checked}, {headers: authHeader()}).then(handleResponse);
}

function deleteRolesUsuario(id) {
    return Axios.post(`${config.apiUrl}/delete_roles_usuario`, {id}, {headers: authHeader()}).then(handleResponse);
}

function getRolesUsuario(id) {
    return Axios.post(`${config.apiUrl}/get_roles_usuario`, {id}, {headers: authHeader()}).then(handleResponse);
}

function eliminarUser(id) {
    return Axios.post(`${config.apiUrl}/borrar_usuario`, {id}, {headers: authHeader()}).then(handleResponse);
}

function actualizarUser(datos) {
    return Axios.post(`${config.apiUrl}/actualizar_usuario`, {datos}, {headers: authHeader()}).then(handleResponse);
}

function solicitudRecu(user) {
    return Axios.post(`${config.apiUrl}/solicitud_recupero`, {user}, {headers: authHeader()}).then(handleResponse);
}

function validateResetToken(id, token){
    return Axios.post(`${config.apiUrl}/validar_token`, {id, token}).then(handleResponse);
}

function resetPassword(id, token, password){
    return Axios.post(`${config.apiUrl}/reset_pass`, {id, token, password}).then(handleResponse);
}

function buscarTotalUsuarios() {
    return Axios.put(`${config.apiUrl}/buscarTotalUsuarios`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarUsuariosActivos() {
    return Axios.put(`${config.apiUrl}/buscarUsuariosActivos`, {}, {headers: authHeader()}).then(handleResponse);
}
 
function buscarUsuariosEliminados() {
    return Axios.put(`${config.apiUrl}/buscarUsuariosEliminados`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarUsuariosBloqueados() {
    return Axios.put(`${config.apiUrl}/buscarUsuariosBloqueados`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarUsuariosAdministradores() {
    return Axios.put(`${config.apiUrl}/buscarUsuariosAdministradores`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarUsuariosMecanicos() {
    return Axios.put(`${config.apiUrl}/buscarUsuariosMecanicos`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarUsuariosVendedores() {
    return Axios.put(`${config.apiUrl}/buscarUsuariosVendedores`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarUsuariosAdministrativos() {
    return Axios.put(`${config.apiUrl}/buscarUsuariosAdministrativos`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarUsuariosSupervisores() {
    return Axios.put(`${config.apiUrl}/buscarUsuariosSupervisores`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarUsuariosGerentes() {
    return Axios.put(`${config.apiUrl}/buscarUsuariosGerentes`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarCantidadVentas() {
    return Axios.put(`${config.apiUrl}/buscarCantidadVentas`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarCantidadReservas() {
    return Axios.put(`${config.apiUrl}/buscarCantidadReservas`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarVentasFinalizadas(sucursal) {
    return Axios.put(`${config.apiUrl}/buscarVentasFinalizadas`, {sucursal}, {headers: authHeader()}).then(handleResponse);
}

function buscarVentasCanceladas() {
    return Axios.put(`${config.apiUrl}/buscarVentasCanceladas`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarVentasIniciadas() {
    return Axios.put(`${config.apiUrl}/buscarVentasIniciadas`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarUltimaVenta(sucursal) {
    return Axios.put(`${config.apiUrl}/buscarUltimaVenta`, {sucursal}, {headers: authHeader()}).then(handleResponse);
}

function buscarIngresosTotales(sucursal) {
    return Axios.put(`${config.apiUrl}/buscarIngresosTotales`, {sucursal}, {headers: authHeader()}).then(handleResponse);
}

function buscarVentaPromedio(sucursal) {
    return Axios.put(`${config.apiUrl}/buscarVentaPromedio`, {sucursal}, {headers: authHeader()}).then(handleResponse);
}

function buscarOrdenesTotales() {
    return Axios.put(`${config.apiUrl}/buscarOrdenesTotales`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarOrdenesFinalizadas() {
    return Axios.put(`${config.apiUrl}/buscarOrdenesFinalizadas`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarOrdenesCanceladas() {
    return Axios.put(`${config.apiUrl}/buscarOrdenesCanceladas`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarOrdenesFacturadas() {
    return Axios.put(`${config.apiUrl}/buscarOrdenesFacturadas`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarOrdenesIniciadas() {
    return Axios.put(`${config.apiUrl}/buscarOrdenesIniciadas`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarUltimaOrden() {
    return Axios.put(`${config.apiUrl}/buscarUltimaOrden`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarOrdenesPendientes() {
    return Axios.put(`${config.apiUrl}/buscarOrdenesPendientes`, {}, {headers: authHeader()}).then(handleResponse);
}

function buscarEgresosTotales(sucursal) {
    return Axios.put(`${config.apiUrl}/buscarEgresosTotales`, {sucursal}, {headers: authHeader()}).then(handleResponse);
}

function buscarVentasVendedor(sucursal) {
    return Axios.put(`${config.apiUrl}/buscarVentasVendedor`, {sucursal}, {headers: authHeader()}).then(handleResponse);
}
