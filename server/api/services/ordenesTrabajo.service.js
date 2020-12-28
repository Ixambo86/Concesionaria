const db = require('../dbConection')

module.exports = { 
    buscarOrdenes,
    eliminarOrden,
    actualizarOrden,
    insertarOrden,
    buscarProductosOrden,
    borrarProductosOrden,
    insertarProductosOrden,
    buscarServiciosOrden,
    insertarServiciosOrden,
    insertarHistoriaOrden,
    buscarHistoriaOrden,
    asignarFactura,
    obtenerEstados
};



async function buscarOrdenes(body) {
    console.log("buscarOrdenes / body: ", body)
    const buscar = body.filtro.buscar ? '%' + body.filtro.buscar + '%':'%';
    const cliente_nombre = body.filtro.cliente_nombre  ? '%' + body.filtro.cliente_nombre + '%':'%';
    const nro_orden = body.filtro.nro_orden ? '%' + body.filtro.nro_orden + '%':'%';
    const estado = body.filtro.estado  ? '%' + body.filtro.estado + '%':'%';
    const automotor_descripcion = body.filtro.automotor_descripcion  ? '%' + body.filtro.automotor_descripcion + '%':'%';
    const sucursal = body.filtro.sucursal  ? '%' + body.filtro.sucursal + '%':'%';
    const fecha_desde = body.filtro.fecha_desde  ? body.filtro.fecha_desde + ' 00:00:00': '1900-01-01';
    const fecha_hasta = body.filtro.fecha_hasta  ? body.filtro.fecha_hasta + ' 23:59:59': '2100-12-31';

    const id = body.orden_id ? body.orden_id: 0;
    const selectOrdenes = "select ot.id, ot.nro_orden, date_format(ot.fecha_hora, '%d/%m/%Y %H:%i') fecha_hora, ot.importe, "+
                        "date_format(ot.fecha_minima_turno, '%d/%m/%Y') fecha_minima_turno, ot.cantidad_modulos, ot.estado, " +
                        "cl.id cliente_id, cl.nro_cliente cliente_nro, concat(cl.nombres, ' ', cl.apellidos) cliente_nombre, cl.razon_social cliente_razon_social, cl.email cliente_email, " +
                        "cl.telefono cliente_telefono, cl.documento cliente_documento, ci.descripcion cliente_condicion_iva, ci.tipo_factura cliente_tipo_factura, "+ 
                        "au.id automotor_id, au.dominio automotor_dominio, au.km automotor_km, tm.descripcion automotor_motor, ot.usuario_id, us.nombre usuario, su.nombre sucursal, "+
                        "mo.id modelo_id, concat(ma.descripcion, ' ', mo.descripcion, ' ', va.descripcion, ' ', au.anio) automotor_descripcion " +
                        "from ordenes_trabajo ot " + 
                        "left join usuarios us on ot.usuario_id = us.id "+
                        "left join sucursales su on us.sucursal_id = su.id "+
                        ",clientes cl, " +
                        "condiciones_iva ci, " +
                        "automotores au, " +
                        "versiones_configuracion vc, " +
                        "tipos_motor tm, " +
                        "versiones_automotor va, " +
                        "marcas_automotor ma, " + 
                        "modelos_automotor mo " + 
                        "where ot.eliminado = 0 " + 
                        "and ot.cliente_id = cl.id " +
                        "and cl.condicion_iva_id = ci.id " +
                        "and ot.automotor_id = au.id " +
                        "and au.version_config_id = vc.id " + 
                        "and vc.version_id = va.id " +
                        "and vc.tipo_motor_id = tm.id " +
                        "and va.modelo_id = mo.id " +  
                        "and mo.marca_id = ma.id " + 
                        "and (concat(cl.nombres, ' ', cl.apellidos) like ? or cl.razon_social like ?) " +
                        "and ot.nro_orden like ? " +
                        "and ot.estado like ? " +
                        "and concat(ma.descripcion, ' ', mo.descripcion, ' ', va.descripcion) like ? " +
                        "and su.nombre like ? " +
                        "and ot.fecha_hora between ? and ? " +
                        "and (au.dominio like ? " +
                        " or cl.documento like ?) " +
                        (id === 0 ? "and 0 = ? ":" and ot.id = ? ") + 
                        "ORDER BY ot.fecha_hora";
    let promise = new Promise((resolve, reject) => {
        db.query(selectOrdenes, [cliente_nombre, cliente_nombre, nro_orden, estado, automotor_descripcion, sucursal, fecha_desde, fecha_hasta, buscar, buscar, id], (err, result) => {
            if (!result) {
                console.log("buscarOrdenes / err: ", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(ot => {
                    const {...ordenes} = ot;
                    ret.push(ordenes)
                });
               console.log("buscarOrdenes / ret: ", ret)
                resolve(ret)
            }
        })
    }); 
    return promise;
}

async function actualizarOrden(body) {
    const nro_orden = body.nro_orden;
    const cliente_id = body.cliente_id;
    const automotor_id = body.automotor_id;
    const importe = body.importe;
    const estado = body.estado;
    const orden_id = body.orden_id;
    const cantidad_modulos = body.cantidad_modulos;
    const fecha_minima_turno = body.fecha_minima_turno
    const updateOrden = 'UPDATE ordenes_trabajo SET nro_orden = ?, cliente_id = ?, automotor_id = ?, importe = ?, estado = ?, cantidad_modulos = ?, fecha_minima_turno = STR_TO_DATE(?, "%d/%m/%Y") WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(updateOrden, [nro_orden, cliente_id, automotor_id, importe, estado, cantidad_modulos, fecha_minima_turno, orden_id], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                resolve(result)
            }
        })
    });
    return promise;
}

async function eliminarOrden(body) {
    ////console.log(body)
    const id = body.orden_id;
    const deleteOrden = 'UPDATE ordenes_trabajo SET eliminado = 1 WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(deleteOrden, [id], (err, result) => {
            if (err) {
                ////console.log(err)
                resolve(err);
            } else {
                ////console.log(result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function insertarOrden(body) {
    console.log("insertarOrden / body: ", body)
    const cliente_id = body.cliente_id;
    const automotor_id = body.automotor_id;
    const importe = body.importe;
    const cantidad_modulos = body.cantidad_modulos;
    const fecha_minima_turno = body.fecha_minima_turno
    const usuario_id = body.usuario_id
    const insertOrden = 'INSERT INTO ordenes_trabajo(fecha_hora, nro_orden, cliente_id, automotor_id, importe, total, cantidad_modulos, fecha_minima_turno, estado, usuario_id, fecha_modificacion) ' +
                        'VALUES(sysdate(), (select concat("OT", lpad((select COALESCE(max(ot.id), 0)+1 from ordenes_trabajo ot), 8, "0"))), ?, ?, ?, ?, ?, STR_TO_DATE(?, "%d/%m/%Y"), "INICIADA", ?, sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertOrden, [cliente_id, automotor_id, importe, importe, cantidad_modulos, fecha_minima_turno, usuario_id], (err, result) => {
            if (err) {
                console.log("insertarOrden / err: ", err)
                resolve(err);
            } else {
                console.log("insertarOrden / result: ", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarProductosOrden(body) {
    console.log("buscarProductosOrden / body: ", body)
    const id = body.orden_id;
    const selectProductos = "select pp.* , date_format(date_add(sysdate(), interval case stock when 0 then plazo_entrega else 0 end day), '%d/%m/%Y') fecha_entrega from ( " +
                                "SELECT p.id, otp.item, p.categoria_id, p.descripcion, p.precio, otp.nro_lote, otp.cantidad, " +
                                "sum(coalesce(pi.stock, null,  0)-coalesce(pi.reservado, null, 0)) stock, p.plazo_entrega " +
                                "FROM productos p LEFT JOIN productos_inventario pi ON (p.id = pi.producto_id AND (pi.stock-pi.reservado) > 0), ordenes_trabajo_producto otp " +
                                "WHERE p.id = otp.producto_id " +
                                "AND otp.orden_trabajo_id = ? " +
                                "group by p.id  ) pp " +
                                "order by pp.item";
    let promise = new Promise((resolve, reject) => {
        db.query(selectProductos, [id], (err, result) => {
            if (err) {
                console.log("buscarProductosOrden / err: ", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(p => {
                    const {...productos} = p;
                    ret.push(productos)
                });
                console.log("buscarProductosOrden / ret: ", ret)
                resolve(ret)
            }
        })
    });
    return promise;
}

async function borrarProductosOrden(body) {
    const id = body.orden_id;
    const deleteProductos = 'DELETE FROM ordenes_trabajo_producto WHERE orden_trabajo_id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(deleteProductos, [id], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                resolve(result)
            }
        })
    });
    return promise;
}

async function insertarProductosOrden(body) {
    const orden_id = body.orden_id
    const item = body.item
    const producto_id = body.producto_id
    const cantidad = body.cantidad ? body.cantidad : 1;
    const importe = body.importe
    const nro_lote = body.nro_lote
    console.log("insertarProductosOrden / body: ", body)
    const insertProductos = 'INSERT INTO ordenes_trabajo_producto(orden_trabajo_id, item, producto_id, cantidad, importe, nro_lote) VALUES(?, ?, ?, ?, ?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertProductos, [orden_id, item, producto_id, cantidad, importe, nro_lote], (err, result) => {
            if (err) {
                console.log("insertarProductosOrden / err: ", err)
                resolve(err);
            } else {
                console.log("insertarProductosOrden / result: ", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarServiciosOrden(body) {
    const id = body.orden_id;
    const selectServicios = 'SELECT srv.* FROM servicios srv, ordenes_trabajo_servicio ots WHERE srv.id = ots.servicio_id AND ots.orden_trabajo_id = ? order by ots.item';
    let promise = new Promise((resolve, reject) => {
        db.query(selectServicios, [id], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                let ret = [];
                result.map(s => {
                    const {...servicios} = s;
                    ret.push(servicios)
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function insertarServiciosOrden(body) {
    const orden_id = body.orden_id
    const item = body.item
    const servicio_id = body.servicio_id
    const cantidad = body.cantidad
    const importe = body.importe
    /*const cantidad = body.cantidad*/
    const insertProductos = 'INSERT INTO ordenes_trabajo_servicio(orden_trabajo_id, item, servicio_id, cantidad, importe) VALUES(?, ?, ?, ?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertProductos, [orden_id, item, servicio_id, cantidad, importe], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                resolve(result)
            }
        })
    });
    return promise;
}

async function insertarHistoriaOrden(body) {
    const orden_id = body.orden_id
    const observacion = body.observacion
    const usuario_id = body.usuario_id

    ////console.log("insertarHistoriaOrden / body: ", body)
    const insertHistoria = 'INSERT INTO ordenes_trabajo_observacion(fecha_hora, orden_trabajo_id, observacion, usuario_id) VALUES(sysdate(), ?, ?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertHistoria, [orden_id, observacion, usuario_id], (err, result) => {
            if (err) {
                ////console.log("insertarHistoriaOrden / err: ",err)
                resolve(err);
            } else {
                ////console.log("insertarHistoriaOrden / result: ",result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarHistoriaOrden(body) {
    const orden_id = body.orden_id;
    const selectHistoria = "SELECT oto.id, DATE_FORMAT(oto.fecha_hora, '%d/%m/%Y %h:%i') fecha, oto.observacion, u.nombre " + 
                            "FROM ordenes_trabajo_observacion oto, usuarios u " +
                            "WHERE u.id = oto.usuario_id " +
                            "AND oto.orden_trabajo_id = ? " +
                            "order by oto.fecha_hora DESC";
    let promise = new Promise((resolve, reject) => {
        db.query(selectHistoria, [orden_id], (err, result) => {
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

async function asignarFactura(body) {
    console.log("asignaFactura / body", body)
    const orden_id = body.orden_id;
    const factura_id = body.factura_id;
    const updatePedido = 'UPDATE ordenes_trabajo SET factura_id = ? ' + 
                        ' WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(updatePedido, [factura_id, orden_id], (err, result) => {
            if (err) {
                console.log("asignaFactura / err", err)
                resolve(err);
            } else {
                console.log("asignaFactura / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function obtenerEstados() {
    const select = "SELECT DISTINCT estado FROM ordenes_trabajo";
    let promise = new Promise((resolve, reject) => {
        db.query(select, (err, result) => {
            if (err) {
                console.log("obtenerEstados / err: ",err)
                resolve(err);
            } else {
                let ret = [];
                result.map(e => {
                    const {...estado} = e;
                    ret.push(estado)
                });
                console.log("obtenerEstados / ret: ",ret)
                resolve(ret)
            }
        })
    });
    return promise;
}