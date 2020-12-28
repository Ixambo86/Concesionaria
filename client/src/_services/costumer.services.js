import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const costumerService = {
    buscarCostumers,
    editarMsj
};

function buscarCostumers() {
    return Axios.get(`${config.apiUrl}/costumer/get`, {headers: authHeader()}).then(handleResponse);
}

function editarMsj(id, asunto, titulo, mensaje) {
    return Axios.post(`${config.apiUrl}/costumer/editar`, {id:id, asunto:asunto, titulo:titulo, mensaje:mensaje}, {headers: authHeader()}).then(handleResponse); 
}