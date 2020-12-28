import { config } from '../config';

export const reporteService = {
    balanceIngresosEgresos,
};

function balanceIngresosEgresos(sucursal, f_desde, f_hasta) {
    window.open(`${config.apiUrl}/reportes/balance?sucur_id=${sucursal}&f_desde=${f_desde}&f_hasta=${f_hasta}`); 
}