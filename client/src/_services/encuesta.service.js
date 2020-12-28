import { config } from '../config';
import { authHeader } from '../_helpers/auth-headers';
import { handleResponse } from '../_helpers/handle-response';
import Axios from 'axios';

export const encuestaService = {
    enviarEncuesta,
};

function enviarEncuesta(puntaje, atributo, msjBueno, msjMalo, asunto) {
    return Axios.put(`${config.apiUrl}/encuesta/enviar`, {puntaje: puntaje, atributo: atributo, msjBueno: msjBueno, msjMalo: msjMalo, asunto:asunto}, {headers: authHeader()}).then(handleResponse); 
}