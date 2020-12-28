import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const arqueoService = {
    buscarSucursal,
    buscarTotalEgresos,
    buscarTotalIngresos,
    guardarArqueo,
    buscarArqueo
};
 
function buscarSucursal(id) {
    return Axios.put(`${config.apiUrl}/sucursales/get_by_id`, {id: id}, {headers: authHeader()}).then(handleResponse); 
}

function buscarTotalEgresos(id, hoy) {
    return Axios.put(`${config.apiUrl}/arqueo/get_egreso`, {sucur_id: id, f_desde: hoy, f_hasta: hoy}, {headers: authHeader()}).then(handleResponse); 
}

function buscarTotalIngresos(id, hoy) {
    return Axios.put(`${config.apiUrl}/arqueo/get_ingreso`, {sucur_id: id, f_desde: hoy, f_hasta: hoy}, {headers: authHeader()}).then(handleResponse); 
}

function guardarArqueo(data) {
    return Axios.post(`${config.apiUrl}/arqueo/set_arqueo`, {data: data}, {headers: authHeader()}).then(handleResponse);
}

function buscarArqueo(fecha, sucur_id) {
    return Axios.put(`${config.apiUrl}/arqueo/buscar`, {fecha: fecha, sucur_id: sucur_id}, {headers: authHeader()}).then(handleResponse);
}