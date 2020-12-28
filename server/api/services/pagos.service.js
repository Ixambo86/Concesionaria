const db = require('../dbConection')

module.exports = {
    buscarMediosPago,
    buscarPagos,
    obtenerPago,
    obtenerDetallePago,
    insertarPago,
    insertarPagoDetalle
};

async function buscarMediosPago(body) {
    console.log("buscarMediosPago / body", body)
    const filtro = body.filtro ? '%' + body.filtro + '%' : '%'
    
    const selectFacturas = 'SELECT id, descripcion FROM medios_pago'; 
    let promise = new Promise((resolve, reject) => {
        db.query(selectFacturas, [filtro, filtro, filtro], (err, result) => {
            if (!result) {
                console.log("buscarMediosPago / err", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(f => {
                    const {...factu } = f;
                    ret.push(factu)
                });
                console.log("buscarMediosPago / ret", ret)
                resolve(ret)
            }
        })
    });
    return promise;    
}

async function buscarPagos(body) {
    console.log("buscarPagos / body", body)
    const filtro = body.filtro ? '%' + body.filtro + '%' :'%'
    const factura_id = body.factura_id ? body.factura_id : 0
    const selectFacturaDetalle = 'SELECT pc.id, pc.nro_pago, DATE_FORMAT(pc.fecha_hora, "%d/%m/%Y %h:%i") fecha_hora, pc.cliente_id, pc.concepto, pc.importe, ' + 
                                'concat(cl.nombres, " ", cl.apellidos) cliente_nombre, fc.nro_factura, pc.usuario_id, us.nombre usuario ' + 
                                ' FROM pagos_cliente pc, pagos_cliente_factura pcf, facturas fc, clientes cl, usuarios us '+ 
                                ' WHERE pc.id = pcf.pago_id ' +
                                ' AND pcf.factura_id = fc.id ' +
                                ' AND pc.cliente_id = cl.id ' +
                                ' AND pc.usuario_id = us.id ' +
                                ' AND ' + (factura_id === 0 ? ' 0 = ? ' : ' pcf.factura_id = ? ') + 
                                ' AND ( pc.nro_pago like ? ' + 
                                ' OR  fc.nro_factura like ? ' + 
                                ' OR  concat(cl.nombres, " ", cl.apellidos) like ? ' + 
                                ' OR  cl.documento like ?) ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectFacturaDetalle, [factura_id, filtro, filtro, filtro, filtro], (err, result) => {
            if (!result) {
                console.log("buscarPagos / err", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(f => {
                    const {...factu } = f;
                    ret.push(factu)
                });
                console.log("buscarPagos / ret", ret)
                resolve(ret)
            }
        })
    });
    return promise;    
}

async function obtenerPago(body) {
    const pago_id = body.pago_id
    const selectFacturaPagos = 'SELECT pc.id, pc.nro_pago, DATE_FORMAT(pc.fecha_hora, "%d/%m/%Y %h:%i") fecha_hora, pc.concepto, pc.importe, us.nombre usuario '+ 
                                'FROM pagos_cliente pc, usuarios us ' +
                                'WHERE pc.usuario_id = us.id ' + 
                                'AND pc.pago_id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectFacturaPagos, [pago_id], (err, result) => {
            if (!result) {
                console.log("obtenerPago / err", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(f => {
                    const {...factu } = f;
                    ret.push(factu)
                });
                console.log("obtenerPago / ret", ret)
                resolve(ret)
            }
        })
    });
    return promise;    
}

async function obtenerDetallePago(body) {
    const pago_id = body.pago_id
    const selectDetalle = 'SELECT pcd.id, pcd.pago_id, pcd.medio_pago_id, mp.descripcion medio_pago, pcd.nro_transaccion, pcd.importe ' +
                                  'FROM pagos_cliente_detalle pcd, medios_pago mp ' +
                                  'WHERE pcd.medio_pago_id =  mp.id ' + 
                                  'AND pcd.pago_id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectDetalle, [pago_id], (err, result) => {
            if (!result) {
                console.log("obtenerDetallePago / err", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(f => {
                    const {...factu } = f;
                    ret.push(factu)
                });
                console.log("obtenerDetallePago / ret", ret)
                resolve(ret)
            }
        })
    });
    return promise;    
}

async function insertarPago(body) {
    console.log("insertarPago / body", body)
    const cliente_id = body.cliente_id;
    const concepto = body.concepto;
    const importe = body.importe;
    const usuario_id = body.usuario_id;
    const insertFactura = 'INSERT INTO pagos_cliente(fecha_hora, nro_pago, cliente_id, concepto, importe, usuario_id, fecha_modificacion) ' +
                        'VALUES(sysdate(), (select concat("PA", lpad((select COALESCE(max(pc.id), 0)+1 from pagos_cliente pc), 8, "0"))), ?, ?, ?, ?, sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertFactura, [cliente_id, concepto, importe, usuario_id], (err, result) => {
            if (err) {
                console.log("insertarPago / err", err)
                resolve(err);
            } else {
                console.log("insertarPago / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function insertarPagoDetalle(body) {
    const pago_id = body.pago_id
    const medio_pago_id = body.medio_pago_id
    const nro_transaccion = body.nro_transaccion
    const importe = body.importe
    console.log("insertarPagoDetalle / body", body)
    const insertFacturaDetalle = 'INSERT INTO pagos_cliente_detalle(pago_id, medio_pago_id, nro_transaccion, importe) VALUES(?, ?, ?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertFacturaDetalle, [pago_id, medio_pago_id, nro_transaccion, importe], (err, result) => {
            if (err) {
                console.log("insertarPagoDetalle / err", err)
                resolve(err);
            } else {
                console.log("insertarPagoDetalle / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}
