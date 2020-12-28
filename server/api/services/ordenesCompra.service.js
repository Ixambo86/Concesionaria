const db = require('../dbConection')

module.exports = {
    generarOrdenCompra,
    buscarOrdenes,
    eliminarOrden,
    actualizarOrden,
    insertarOrden,
    buscarProductosOrden,
    insertarProductosOrden,
    insertarHistoriaOrden,
    buscarHistoriaOrden
};

async function generarOrdenCompra(body) {
    console.log("generarOrdenCompra / body: ", body)
    const producto_id = body.producto_id
    const sucursal_id = body.sucursal_id
    const callPR = 'CALL generar_orden_compra(?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(callPR, [producto_id, sucursal_id], (err, result) => {
            if (err) {
                console.log("generarOrdenCompra / err: ", err)
                resolve(err);
            } else {
                console.log("generarOrdenCompra / result: ", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarOrdenes(body) {
    console.log("buscarOrdenes / body: ", body)
    const buscar = body.filtro.buscar ? '%' + body.filtro.buscar + '%':'%';
    const proveedor_nombre = body.filtro.proveedor_nombre  ? '%' + body.filtro.proveedor_nombre + '%':'%';
    const nro_orden = body.filtro.nro_orden ? '%' + body.filtro.nro_orden + '%':'%';
    const estado = body.filtro.estado  ? '%' + body.filtro.estado + '%':'%';
    const producto_descripcion = body.filtro.producto_descripcion  ? '%' + body.filtro.producto_descripcion + '%':'%';
    const sucursal = body.filtro.sucursal  ? '%' + body.filtro.sucursal + '%':'%';
    const fecha_desde = body.filtro.fecha_desde  ? body.filtro.fecha_desde + ' 00:00:00': '1900-01-01';
    const fecha_hasta = body.filtro.fecha_hasta  ? body.filtro.fecha_hasta + ' 23:59:59': '2100-12-31';

    const id = body.orden_id ? body.orden_id: 0;
    const selectPedidos = "select oc.id, oc.nro_orden, date_format(oc.fecha_hora, '%d/%m/%Y %H:%i') fecha_hora, oc.estado, date_format(re.fecha_hora, '%d/%m/%Y %H:%i') fecha_recepcion, "+
                            "pr.id proveedor_id, pr.nro_proveedor proveedor_nro, concat(pr.nombres, ' ', pr.apellidos) proveedor_nombre, pr.email proveedor_email, pr.telefono proveedor_telefono, " +
                            " pr.razon_social proveedor_razon_social, pr.documento proveedor_documento, ci.descripcion proveedor_condicion_iva, su.nombre sucursal, " +
                            " concat(pr.calle, ' ', pr.altura, ' ', pr.piso, '°', pr.dpto, ', ', lo.nombre, ', ', prv.nombre, ', ', pa.nombre) proveedor_domicilio " +
                            "from ordenes_compra oc "+
                            "left join remitos re on oc.remito_id = re.id " + 
                            "left join sucursales su on oc.sucursal_id = su.id, " + 
                            "proveedores pr, " +
                            "condiciones_iva ci, " +
                            "localidades lo, " +
                            "provincias prv, " +
                            "paises pa " +
                            "where oc.eliminado = 0 " + 
                            "and oc.proveedor_id = pr.id " +
                            "and pr.condicion_iva_id = ci.id " +
                            "and pr.localidad_id = lo.id " +
                            "and lo.provincia_id = prv.id " +
                            "and prv.pais_id = pa.id " +
                            "and (concat(pr.nombres, ' ', pr.apellidos) like ? or pr.razon_social like ?) " +
                            "and oc.nro_orden like ? " +
                            "and oc.estado like ? " +
                            "and oc.id in (SELECT DISTINCT orden_compra_id " + 
                                            "FROM ordenes_compra_detalle ocd, productos p " + 
                                            "WHERE ocd.producto_id = p.id " + 
                                            "AND p.descripcion like ?) " +
                            "and su.nombre like ? " +
                            "and oc.fecha_hora between ? and ? " +
                            "and (oc.nro_orden like ? " + 
                            " or pr.documento like ? ) " + 
                        (id === 0 ? "and 0 = ? ":" and oc.id = ? ") + 
                        "ORDER BY oc.fecha_hora";
    let promise = new Promise((resolve, reject) => {
        db.query(selectPedidos, [proveedor_nombre, proveedor_nombre, nro_orden, estado, producto_descripcion, sucursal, fecha_desde, fecha_hasta, buscar, buscar, id], (err, result) => {
            if (!result) {
                console.log("buscarOrdenes / err: ", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(pe => {
                    const {...pedido} = pe;
                    ret.push(pedido)
                });
                console.log("buscarOrdenes / ret: ", ret)
                resolve(ret)
            }
        })
    });
    return promise;
}

async function actualizarOrden(body) {
    console.log("actualizarOrden / body", body)
    const proveedor_id = body.proveedor_id;
    const estado = body.estado;
    const orden_id = body.orden_id;
    const updatePedido = 'UPDATE ordenes_compra SET proveedor_id = ?, estado = ?, fecha_modificacion = sysdate() ' +
                        ' WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(updatePedido, [proveedor_id, estado, orden_id], (err, result) => {
            if (err) {
                console.log("actualizarOrden / err", err)
                resolve(err);
            } else {
                console.log("actualizarOrden / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function eliminarOrden(body) {
    console.log("eliminarOrden / body: ", body)
    const id = body.orden_id;
    const deletePedido = 'UPDATE ordenes_compra SET eliminado = 1 WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(deletePedido, [id], (err, result) => {
            if (err) {
                console.log("eliminarOrden / err: ", err)
                resolve(err);
            } else {
                console.log("eliminarOrden / result: ", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function insertarOrden(body) {
    console.log("insertarOrden / body", body)
    const proveedor_id = body.proveedor_id;
    const estado = body.estado;
    const insertPedido = 'INSERT INTO ordenes_compra(fecha_hora, nro_orden, proveedor_id, estado, fecha_modificacion) ' +
                        'VALUES(sysdate(), (select concat("OC", lpad((select COALESCE(max(oc.id), 0)+1 from ordenes_compra oc), 8, "0"))), ?, ?, sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertPedido, [proveedor_id, estado], (err, result) => {
            if (err) {
                console.log("insertarOrden / err", err)
                resolve(err);
            } else {
                console.log("insertarOrden / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarProductosOrden(body) {
    console.log("buscarProductosOrden / body: ", body)
    const id = body.orden_id;
    const selectProductos = 'SELECT p.id, p.categoria_id, p.descripcion, ocd.item, ocd.cantidad FROM productos p, ordenes_compra_detalle ocd WHERE p.id = ocd.producto_id AND ocd.orden_compra_id = ? order by ocd.item';
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

// async function borrarProductosOrden(body) {
//     console.log("borrarProductosOrden / body", body)
//     const id = body.pedido_id;
//     const deleteProductos = 'DELETE FROM pedidos_detalle WHERE pedido_id = ?';
//     let promise = new Promise((resolve, reject) => {
//         db.query(deleteProductos, [id], (err, result) => {
//             if (err) {
//                 console.log("borrarProductosOrden / err", err)
//                 resolve(err);
//             } else {
//                 console.log("borrarProductosOrden / result", result)
//                 resolve(result)
//             }
//         })
//     });
//     return promise;
// }

async function insertarProductosOrden(body) {
    const orden_id = body.orden_id
    const item = body.item
    const producto_id = body.producto_id
    const cantidad = body.cantidad ? body.cantidad : 1;
    console.log("insertarProductosOrden / body", body)
    const insertProductos = 'INSERT INTO ordenes_compra_detalle(orden_compra_id, item, producto_id, cantidad) VALUES(?, ?, ?, ?, ?, ?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertProductos, [orden_id, item, producto_id, cantidad], (err, result) => {
            if (err) {
                console.log("insertarProductosOrden / err", err)
                resolve(err);
            } else {
                console.log("insertarProductosOrden / result", result)
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

    console.log("insertarHistoriaOrden / body: ", body)
    const insertHistoria = 'INSERT INTO ordenes_compra_observacion(fecha_hora, orden_compra_id, observacion, usuario_id) VALUES(sysdate(), ?, ?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertHistoria, [orden_id, observacion, usuario_id], (err, result) => {
            if (err) {
                console.log("insertarHistoriaOrden / err: ",err)
                resolve(err);
            } else {
                console.log("insertarHistoriaOrden / result: ",result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarHistoriaOrden(body) {
    console.log("buscarHistoriaOrden / body: ",body)
    const orden_id = body.orden_id;
    const selectHistoria = "SELECT oco.id, DATE_FORMAT(oco.fecha_hora, '%d/%m/%Y %h:%i') fecha, oco.observacion, u.nombre " + 
                            "FROM ordenes_compra_observacion oco, usuarios u " +
                            "WHERE u.id = oco.usuario_id " +
                            "AND oco.orden_compra_id = ? " +
                            "order by oco.fecha_hora DESC";
    let promise = new Promise((resolve, reject) => {
        db.query(selectHistoria, [orden_id], (err, result) => {
            if (err) {
                console.log("buscarHistoriaOrden / err: ",err)
                resolve(err);
            } else {
                let ret = [];
                result.map(h => {
                    const {...historia} = h;
                    ret.push(historia)
                });
                console.log("buscarHistoriaOrden / ret: ",ret)
                resolve(ret)
            }
        })
    });
    return promise;
}
