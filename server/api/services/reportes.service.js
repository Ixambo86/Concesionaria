const db = require('../dbConection')

module.exports = {
    buscarIngresos,
    buscarEgresos,
    totalIngresos,
    totalEgresos
}

async function buscarIngresos(body) {
    const sucur_id = body.sucur_id;
    const f_desde = body.f_desde;
    const f_hasta = body.f_hasta;
    const selectFactu = "select f.nro_factura, f.fecha_hora, f.saldo, s.nombre as sucursal from facturas f, usuarios u, sucursales s where f.usuario_id = u.id and u.sucursal_id = s.id and s.id = ? and f.estado = 'PAGADA' and DATE(f.fecha_hora) >= ? and DATE(f.fecha_hora) <= ?"
    
    let promise = new Promise((resolve, reject) => {
        db.query(selectFactu, [sucur_id, f_desde, f_hasta], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                let ret = {sucursal: '', ingresos: []};
                result.map(p => {
                    const { sucursal, ...facturas } = p;
                    ret.sucursal = sucursal;
                    ret.ingresos.push(facturas);
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarEgresos(body) {
    const sucur_id = body.sucur_id;
    const f_desde = body.f_desde;
    const f_hasta = body.f_hasta;
    const selectPago = "select p.nro_pago, p.fecha_hora, p.importe from pagos_proveedor p, usuarios u, sucursales s where p.usuario_id = u.id and u.sucursal_id = s.id and s.id = ? and DATE(p.fecha_hora) >= ? and DATE(p.fecha_hora) <= ?";
    
    let promise = new Promise((resolve, reject) => {
        db.query(selectPago, [sucur_id, f_desde, f_hasta], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                let ret = {egresos: []};
                result.map(p => {
                    const { ...egresos } = p;
                    ret.egresos.push(egresos);
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function totalIngresos(body) {
    const sucur_id = body.sucur_id;
    const f_desde = body.f_desde;
    const f_hasta = body.f_hasta;
    const totalIngreso = "select sum(f.saldo) as total from facturas f, usuarios u, sucursales s where f.usuario_id = u.id and u.sucursal_id = s.id and s.id = ? and f.estado = 'PAGADA' and DATE(f.fecha_hora) >= ? and DATE(f.fecha_hora) <= ?";
    
    let promise = new Promise((resolve, reject) => {
        db.query(totalIngreso, [sucur_id, f_desde, f_hasta], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                resolve(result)
            }
        })
    });
    return promise;
}

async function totalEgresos(body) {
    const sucur_id = body.sucur_id;
    const f_desde = body.f_desde;
    const f_hasta = body.f_hasta;
    const totalEgreso = "select sum(p.importe) as total from pagos_proveedor p, usuarios u, sucursales s where p.usuario_id = u.id and u.sucursal_id = s.id and s.id = ? and DATE(p.fecha_hora) >= ? and DATE(p.fecha_hora) <= ?";
    
    let promise = new Promise((resolve, reject) => {
        db.query(totalEgreso, [sucur_id, f_desde, f_hasta], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                resolve(result)
            }
        })
    });
    return promise;
}
