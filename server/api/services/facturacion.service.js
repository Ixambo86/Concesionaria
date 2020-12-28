const db = require('../dbConection')

module.exports = {
    buscarFacturas,
    buscarFacturaDetalle,
    insertarFacturaPago,
    insertarFactura,
    actualizarFactura,
    insertarFacturaDetalle,
    insertarHistoriaFactura,
    buscarHistoriaFactura
};

async function buscarFacturas(body) {
    console.log("buscarFacturas / body", body)
    const buscar = body.filtro.buscar ? '%' + body.filtro.buscar + '%':'%';
    const cliente_nombre = body.filtro.cliente_nombre  ? '%' + body.filtro.cliente_nombre + '%':'%';
    const nro_factura = body.filtro.nro_factura ? '%' + body.filtro.nro_factura + '%':'%';
    const estado = body.filtro.estado  ? '%' + body.filtro.estado + '%':'%';
    const sucursal = body.filtro.sucursal  ? '%' + body.filtro.sucursal + '%':'%';
    const fecha_desde = body.filtro.fecha_desde  ? body.filtro.fecha_desde + ' 00:00:00': '1900-01-01';
    const fecha_hasta = body.filtro.fecha_hasta  ? body.filtro.fecha_hasta + ' 23:59:59': '2100-12-31';
    
    const selectFacturas = 'SELECT f.id, f.nro_factura, f.tipo, DATE_FORMAT(f.fecha_hora, "%d/%m/%Y %h:%i") fecha_hora, f.cliente_id, f.iva, f.total, f.saldo, c.nro_cliente cliente_nro, ' +
                            'concat(c.nombres, " ", c.apellidos) cliente_nombre, c.documento cliente_documento, c.telefono cliente_telefono, c.email cliente_email, f.estado, ' +
                            ' concat(c.calle, " ", c.altura, " ", coalesce(c.piso, ""), coalesce(c.dpto, ""), ", ", lo.nombre, ", ", pr.nombre, ", ", pa.nombre ) cliente_domicilio, ' + 
                            ' ci.descripcion cliente_condicion_iva, ci.tipo_factura cliente_tipo_factura, f.usuario_id, u.nombre usuario, s.nombre sucursal ' +
                            ' FROM facturas f, clientes c, condiciones_iva ci, localidades lo, provincias pr, paises pa, usuarios u, sucursales s ' +
                            ' WHERE c.id = f.cliente_id '+ 
                            ' AND c.condicion_iva_id = ci.id ' +
                            ' AND c.localidad_id = lo.id ' + 
                            ' AND lo.provincia_id = pr.id ' + 
                            ' AND pr.pais_id = pa.id ' + 
                            ' AND u.id = f.usuario_id ' + 
                            ' AND s.id = u.sucursal_id ' +
                            'and (concat(c.nombres, " ", c.apellidos) like ? or c.razon_social like ?) ' +
                            'and f.nro_factura like ? ' +
                            'and f.estado like ? ' +
                            'and s.nombre like ? ' +
                            'and f.fecha_hora between ? and ? ' +
                            ' AND  c.documento like ?  '; 
    let promise = new Promise((resolve, reject) => {
        db.query(selectFacturas, [cliente_nombre, cliente_nombre, nro_factura, estado, sucursal, fecha_desde, fecha_hasta, buscar, buscar], (err, result) => {
            if (!result) {
                console.log("buscarFacturas / err", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(f => {
                    const {...factu } = f;
                    ret.push(factu)
                });
                console.log("buscarFacturas / ret", ret)
                resolve(ret)
            }
        })
    });
    return promise;    
}

async function buscarFacturaDetalle(body) {
    //console.log("buscarFacturaDetalle / body", body)
    const factura_id = body.factura_id
    const selectFacturaDetalle = 'SELECT * FROM facturas_detalle WHERE factura_id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectFacturaDetalle, [factura_id], (err, result) => {
            if (!result) {
                //console.log("buscarFacturaDetalle / err", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(f => {
                    const {...factu } = f;
                    ret.push(factu)
                });
                //console.log("buscarFacturaDetalle / ret", ret)
                resolve(ret)
            }
        })
    });
    return promise;    
}

async function insertarFacturaPago(body) {
    console.log("insertarFacturaPago / body", body)
    const pago_id = body.pago_id
    const factura_id = body.factura_id
    const insert = 'INSERT INTO pagos_cliente_factura(pago_id, factura_id)VALUES(?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insert, [pago_id, factura_id], (err, result) => {
            if (err) {
                console.log("insertarFacturaPago / err", err)
                resolve(err);
            } else {
                console.log("insertarFacturaPago / result", result)
                resolve(result)
            }
        })
    });
    return promise;    
}

async function insertarFactura(body) {
    //console.log("insertarFactura / body", body)
    const tipo = body.tipo;
    const cliente_id = body.cliente_id;
    const estado = body.estado;
    const iva = body.iva;
    const total = body.total;
    const saldo = body.saldo;
    const usuario_id = body.usuario_id
    const insertFactura = 'INSERT INTO facturas(fecha_hora, nro_factura, tipo, cliente_id, estado, iva, total, saldo, usuario_id, fecha_modificacion) ' +
                        'VALUES(sysdate(), (select concat("FC", lpad((select COALESCE(max(fc.id), 0)+1 from facturas fc), 8, "0"))), ?, ?, ?, ?, ?, ?, ?, sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertFactura, [tipo, cliente_id, estado, iva, total, saldo, usuario_id], (err, result) => {
            if (err) {
                //console.log("insertarFactura / err", err)
                resolve(err);
            } else {
                //console.log("insertarFactura / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}


async function insertarFacturaDetalle(body) {
    const factura_id = body.factura_id
    const item = body.item
    const descripcion = body.descripcion
    const precio = body.precio
    const cantidad = body.cantidad ? body.cantidad : 1;
    const importe = body.importe
    //console.log("insertarProductosPedido / body", body)
    const insertFacturaDetalle = 'INSERT INTO facturas_detalle(factura_id, item, descripcion, precio, cantidad, importe) VALUES(?, ?, ?, ?, ?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertFacturaDetalle, [factura_id, item, descripcion, precio, cantidad, importe], (err, result) => {
            if (err) {
                //console.log("insertarProductosPedido / err", err)
                resolve(err);
            } else {
                //console.log("insertarProductosPedido / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function actualizarFactura(body) {
    console.log("actualizarFactura / body", body)
    const factura_id = body.factura_id;
    const tipo = body.tipo;
    const estado = body.estado;
    const saldo = body.saldo;
    const usuario_id = body.usuario_id
    const updateFactura = 'UPDATE facturas SET ' + 
                            'tipo = ?, estado = ?, saldo = ?, usuario_id = ?, fecha_modificacion = sysdate() ' +
                            'WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(updateFactura, [tipo, estado, saldo, usuario_id, factura_id], (err, result) => {
            if (err) {
                console.log("actualizarFactura / err", err)
                resolve(err);
            } else {
                console.log("actualizarFactura / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}


async function insertarHistoriaFactura(body) {
    const factura_id = body.factura_id
    const observacion = body.observacion
    const usuario_id = body.usuario_id

    ////console.log("insertarHistoriaFactura / body: ", body)
    const insertHistoria = 'INSERT INTO facturas_observacion(fecha_hora, factura_id, observacion, usuario_id) VALUES(sysdate(), ?, ?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertHistoria, [factura_id, observacion, usuario_id], (err, result) => {
            if (err) {
                ////console.log("insertarHistoriaFactura / err: ",err)
                resolve(err);
            } else {
                ////console.log("insertarHistoriaFactura / result: ",result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarHistoriaFactura(body) {
    ////console.log("buscarHistoriaOrden / body: ",body)
    const factura_id = body.factura_id;
    const selectHistoria = "SELECT fco.id, DATE_FORMAT(fco.fecha_hora, '%d/%m/%Y %h:%i') fecha, fco.observacion, u.nombre " + 
                            "FROM facturas_observacion fco, usuarios u " +
                            "WHERE u.id = fco.usuario_id " +
                            "AND fco.factura_id = ? " +
                            "order by fco.fecha_hora DESC";
    let promise = new Promise((resolve, reject) => {
        db.query(selectHistoria, [factura_id], (err, result) => {
            if (err) {
                ////console.log("buscarHistoriaOrden / err: ",err)
                resolve(err);
            } else {
                let ret = [];
                result.map(h => {
                    const {...historia} = h;
                    ret.push(historia)
                });
                ////console.log("buscarHistoriaOrden / ret: ",ret)
                resolve(ret)
            }
        })
    });
    return promise;
}