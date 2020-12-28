import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const turnoService = {
    buscarSucursales,
    buscarOrdenes,
    buscarTurnos,
    cancelarTurno,
    eliminarTurno,
    insertarTurno,
};
 
function buscarSucursales() {
    return Axios.get(`${config.apiUrl}/sucursales/get`, {headers: authHeader()}).then(handleResponse); 
}

function buscarOrdenes(filtro, orden_id) {
    return Axios.put(`${config.apiUrl}/tordenes/get`, {filtro: filtro, orden_id: orden_id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarTurnos(fecha, sucursal){
    return Axios.put(`${config.apiUrl}/turnos/get`, {fecha: fecha, sucursal: sucursal}, {headers: authHeader()}).then(handleResponse); 
}

function cancelarTurno(fecha, modulo, sucursal, numOt, mecanico) {
    return Axios.put(`${config.apiUrl}/turnos/update`, {fecha: fecha, modulo: modulo, sucursal: sucursal, numOt: numOt, mecanico: mecanico}, {headers: authHeader()}).then(handleResponse); 
}

function eliminarTurno(fecha, modulo, sucursal, numOt, mecanico) {
    return Axios.put(`${config.apiUrl}/turnos/delete`, {fecha: fecha, modulo: modulo, sucursal: sucursal, numOt: numOt, mecanico: mecanico}, {headers: authHeader()}).then(handleResponse);
}

function insertarTurno(fecha, modulo, sucursal, orden, numOt, cantModulos, mecanico, cliente) {
    return Axios.post(`${config.apiUrl}/turnos/insert`, {fecha: fecha, modulo: modulo, sucursal: sucursal, orden: orden, numOt: numOt, cantModulos: cantModulos, mecanico: mecanico, cliente: cliente}, {headers: authHeader()}).then(handleResponse);
}