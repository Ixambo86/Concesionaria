
const db = require('../dbConection')

module.exports = {
    buscarIdProductos,
    insertarRemitoInventario,
    modificarStock,
    buscarRemitos,
    insertarRemito,
    insertarRemitoDetalle,
    remitoYaCargado,
    insertarRemitoEnOrdenCompra,
    ObtenerInfoProducto,
    buscarOrdenesCompra,
    insertarCostoEnProducto,
    insertarOrdenCompra,
    getEmail,
    obtenerRemitoProductos,
    pagarRemito,
    asignarNroLoteOTP,
    asignarNroLotePED
};

async function getEmail(body) {
    //console.log(body)
    const user = body.usuario_id
    const selectEmail = 'SELECT su.email sucursal_email, us.email usuario_email from sucursales su INNER JOIN usuarios us where us.id = ? and us.sucursal_id = su.id'

    let promise = new Promise((resolve, reject) => {
        db.query(selectEmail, [user], (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else if (result.length > 0) {
                console.log(result);
                resolve(result)
            }
        })        
    })
    return promise;
}

async function insertarOrdenCompra(body) {
    console.log("insertarOrdenCompra / body: ", body);
    const nro_orden = body.nro_orden;
    const remito = body.remito;
    const codigo = body.codigo;
    const usuario = body.usuario;

    const insertInventario = 'INSERT INTO ordenes_compra ( nro_orden, remito_id, fecha_hora, estado, proveedor_id, eliminado, sucursal_id) VALUES (?, (select id from remitos where nro_remito = ?), sysdate(), "cargado" ,(select proveedor_id from productos where codigo = ?),0 , (select sucursal_id from usuarios where id = ?))';
    let promise = new Promise((resolve, reject) => {
        db.query(insertInventario, [ nro_orden, remito, codigo, usuario], (err, result) => {
            if (err) {
                console.log("insertarOrdenCompra / err: ", err);
                resolve(err);
            } else {
                console.log("insertarOrdenCompra / result: ", result);
                resolve(result)
            }
        })
    });
    return promise;
}

async function ObtenerInfoProducto(body) {
    const nro_orden = body.orden_compra;
    console.log("ObtenerInfoProducto / body: ", body);
    const selectOrden_id = "SELECT oc.id ordenes_compra_id, pr.codigo producto_nombre, ocd.cantidad cantidad, pr.id producto_id, pr.costo producto_costo FROM productos pr, ordenes_compra_detalle ocd, ordenes_compra oc where pr.id = ocd.producto_id and oc.nro_orden = ? and oc.id = ocd.orden_compra_id";
    let promise = new Promise((resolve, reject) => {
        db.query(selectOrden_id, [nro_orden], (err, result) => {
            if (!result) {
                console.log("ObtenerInfoProducto / err: ", err);
                resolve(err);
            } else {
                let ret = [];
                result.map(c => {
                    const { ...remitos } = c;
                    
                    ret.push(remitos)
                });
                console.log("ObtenerInfoProducto / ret: ", ret);
                resolve(ret)
            }
        })
    });
    return promise;
}
async function buscarOrdenesCompra(body) {
    console.log("buscarOrdenesCompra / body: ", body);
    const nro_orden = body.nro_orden;
    const selectOrden_id = "SELECT op.id orden_compra_id FROM ordenes_compra op  where nro_orden = ?";
    let promise = new Promise((resolve, reject) => {
        db.query(selectOrden_id, [nro_orden], (err, result) => {
            if (!result) {
                console.log("buscarOrdenesCompra / err: ", err);
                resolve(err);
            } else {
                let ret = [];
                result.map(c => {
                    const { ...remitos } = c;
                   
                    ret.push(remitos)
                });
                console.log("buscarOrdenesCompra / ret: ", ret);
                resolve(ret)
            }
        })
    });
    return promise;
}

async function insertarRemitoEnOrdenCompra(body) {
    console.log("insertarRemitoEnOrdenCompra / body: ", body);
    const remito_id = body.remito_id;
    const nro_orden = body.nro_orden;

    const insertRemitoOrden = 'UPDATE ordenes_compra SET remito_id= ? WHERE nro_orden = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(insertRemitoOrden, [ remito_id, nro_orden], (err, result) => {
            if (err) {
                console.log("insertarRemitoEnOrdenCompra / err: ", err);
                resolve(err);
            } else {
                console.log("insertarRemitoEnOrdenCompra / result: ", result);
                resolve(result)
            }
        })
    });
    return promise;
}

async function insertarRemito(body) {
    console.log("insertarRemito / body: ", body);
    const remito = body.remito;
    const usuario_id = body.usuario_id;
    const Descripcion = body.Descripcion;
    const nro_orden = body.nro_orden;
    const codigo = body.SKU;

    const insertInventario = 'INSERT INTO remitos ( nro_remito, fecha_hora, proveedor_id, estado, orden_compra_id, eliminado, usuario_id, fecha_modificacion) VALUES (?, sysdate(), (select proveedor_id FROM productos where productos.codigo = ?),  "IMPORTADO", (select id FROM ordenes_compra where ordenes_compra.nro_orden = ?), 0, ?, sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertInventario, [ remito, codigo, nro_orden, usuario_id], (err, result) => {
            if (err) {
                console.log("insertarRemito / err: ", err);
                resolve(err);
            } else {
                console.log("insertarRemito / result: ", result);
                resolve(result)
            }
        })
    });
    return promise;
}

async function insertarRemitoDetalle(body) {
    console.log("insertarRemitoDetalle / body: ", body);
    const remito_id = body.remito_id;
    const item = body.item;
    const SKU = body.SKU;
    const nro_lote = body.nro_lote;
    const costo = parseFloat(body.costo);
    const cantidad = body.cantidad;
    const fecha_vencimiento = body.fecha_vencimiento;

    const insertInventario = 'INSERT INTO remitos_detalle ( remito_id, item, producto_id, nro_lote, costo, cantidad, eliminado) ' + 
                            'VALUES (?, ?, (select id from productos where codigo = ?), ?, ?, ?, 0)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertInventario, [ remito_id, item, SKU, nro_lote, costo, cantidad], (err, result) => {
            if (err) {
                console.log("insertarRemitoDetalle / err: ", err);
                resolve(err);
            } else {
                console.log("insertarRemitoDetalle / result: ", result);
                resolve(result)
            }
        })
    });
    return promise;
}

async function remitoYaCargado(body) {
    console.log("remitoYaCargado / body: ", body);
    const nro_remito = body.remito;
    const selectRemitos = "SELECT * FROM remitos where nro_remito = ?";
    let promise = new Promise((resolve, reject) => {
        db.query(selectRemitos, [nro_remito], (err, result) => {
            if (!result) {
                console.log("remitoYaCargado / err: ", err);
                resolve(err);
            } else {
                let ret = [];
                result.map(c => {
                    const { ...remitos } = c;
                    
                    ret.push(true)
                });
                console.log("remitoYaCargado / ret: ", ret);
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarRemitos(body) {    
    console.log("buscarRemitos / body: ", body);
    const fil = body.filtro ? '%' + body.filtro + '%' : '%';
    const selectRemitos = "SELECT re.id, re.nro_remito, date_format(re.fecha_hora, '%d/%m/%Y %H:%i') fecha_hora, oc.nro_orden, re.estado, " + 
                            "pr.nro_proveedor proveedor_nro, pr.razon_social proveedor_razon_social, pr.documento proveedor_documento, " + 
                            "ci.descripcion proveedor_condicion_iva, pr.telefono proveedor_telefono, pr.email proveedor_email, " +
                            " COALESCE((select sum(rd.cantidad*rd.costo) from remitos_detalle rd where rd.remito_id = re.id), 0) importe " +
                            "FROM remitos re, proveedores pr, condiciones_iva ci, ordenes_compra oc " + 
                            "where re.eliminado = 0 " +
                            "and re.proveedor_id = pr.id " + 
                            "and pr.condicion_iva_id = ci.id " + 
                            "and re.orden_compra_id = oc.id " + 
                            "and (pr.razon_social like ? " + 
                            "or re.nro_remito like ?)";
    let promise = new Promise((resolve, reject) => {
        db.query(selectRemitos, [fil, fil], (err, result) => {
            if (!result) {
                console.log("buscarRemitos / err: ", err);
                resolve(err);
            } else {
                let ret = [];
                result.map(c => {
                    const { ...remitos } = c;
                    
                    ret.push(remitos)
                });
                console.log("buscarRemitos / ret: ", ret);
                resolve(ret)
            }
        })
    });
    return promise;
}

async function insertarRemitoInventario(body) {
    console.log("insertarRemitoInventario / body: ", body);
    const codigo = body.SKU;
    const descripcion = body.descripcion;
    const nro_lote = body.nroLote;
    const stock = body.stock;
    const fecha_vencimiento = body.fecha_vencimiento;
    const usuario_id = body.usuario_id;

    const insertInventario = 'INSERT INTO productos_inventario ( producto_id, nro_lote, stock, reservado, fecha_vencimiento, eliminado, usuario_id, fecha_modificacion) VALUES ((select id FROM productos where productos.codigo = ?), ?, ?, 0, ?, 0, ?, sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertInventario, [ codigo, nro_lote, stock, fecha_vencimiento, usuario_id ], (err, result) => {
            if (err) {
                console.log("insertarRemitoInventario / err: ", err);
                resolve(err);
            } else {
                //console.log("insertarRemitoInventario / ret: ", ret);
                resolve(result)
            }
        })
    });
    return promise;
}

async function insertarCostoEnProducto(body) {
    console.log("insertarCostoEnProducto / body: ", body);
    const codigo = body.SKU;
    const costo = parseFloat(body.costo);
    console.log(codigo);
    console.log(costo);
    const insertInventario = 'UPDATE productos SET costo= ? WHERE codigo= ?';
    let promise = new Promise((resolve, reject) => {
        db.query(insertInventario, [ costo, codigo ], (err, result) => {
            if (err) {
                console.log("insertarCostoEnProducto / err: ", err);
                resolve(err);
            } else {
                console.log("insertarCostoEnProducto / result: ", result);
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarIdProductos(body) {
    console.log("buscarIdProductos / body: ", body);
    const codigo = body.SKU;
    const nro_lote = body.NroLote;
    const descripcion = body.Descripcion;

    //console.log(producto_id, nro_lote, descripcion);
    const selectProductos = ' select producto_id, nro_lote, stock from productos_inventario where producto_id = (select id FROM productos where productos.codigo = ?) and nro_lote = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectProductos, [codigo, nro_lote], (err, result) => {
            if (!result) {
                console.log("buscarIdProductos / err: ", err);
                resolve(err);
            } else {
                let ret = [];
                result.map(c => {
                    const { ...productos } = c;
                    
                    ret.push(productos)
                });
                console.log("buscarIdProductos / ret: ", ret);
                resolve(ret)
            }
        })
    });
    return promise;
}

async function modificarStock(body) {
    console.log("modificarStock / body: ", body);
    const producto_id = body.producto_id;
    const nro_lote = body.nro_lote;
    const stock = body.nuevoStock;
    const usuario_id = body.usuario_id;


    const editProveedor = 'UPDATE productos_inventario SET stock= ?, ' + 
                            'reservado = reservado + (SELECT SUM(p.cantidad) FROM( '+
                                'SELECT cantidad FROM ordenes_trabajo_producto ' +
                                'WHERE producto_id = ? AND nro_lote = 0 ' +
                                'UNION ' +
                                'SELECT cantidad FROM pedidos_detalle ' +
                                'WHERE producto_id = ? AND nro_lote = 0) p), ' +
                            'usuario_id= ?, fecha_modificacion=sysdate()  WHERE producto_id = ? and nro_lote = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(editProveedor, [stock, producto_id, producto_id, usuario_id, producto_id, nro_lote], (err, result) => {
            if (err) {
                console.log("modificarStock / err: ", err);
                resolve(err);
            } else {
                console.log("modificarStock / result: ", result);
                resolve(result)
            }
        })
    });
    return promise;
}

async function obtenerRemitoProductos(body) {
    console.log("obtenerRemitoProductos / body: ", body);
    const remito_id = body.remito_id;
    
    const selectProductos = 'SELECT rd.id, rd.item, p.descripcion, rd.nro_lote, rd.cantidad, rd.costo, (rd.cantidad * rd.costo) importe ' + 
                            'FROM remitos_detalle rd, productos p ' + 
                            'WHERE rd.remito_id = ? ' + 
                            'AND rd.producto_id = p.id';
    let promise = new Promise((resolve, reject) => {
        db.query(selectProductos, [remito_id], (err, result) => {
            if (!result) {
                console.log("obtenerRemitoProductos / err: ", err);
                resolve(err);
            } else {
                let ret = [];
                result.map(c => {
                    const { ...productos } = c;
                    
                    ret.push(productos)
                });
                console.log("obtenerRemitoProductos / ret: ", ret);
                resolve(ret)
            }
        })
    });
    return promise;
}

async function pagarRemito(body) {
    console.log("pagarRemito / body: ", body);
    const remito_id = body.remito_id;
    const usuario_id = body.usuario_id;


    const editProveedor = 'UPDATE remitos SET estado = "PAGADO", usuario_id= ?, fecha_modificacion=sysdate()  WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(editProveedor, [usuario_id, remito_id], (err, result) => {
            if (err) {
                console.log("pagarRemito / err: ", err);
                resolve(err);
            } else {
                console.log("pagarRemito / result: ", result);
                resolve(result)
            }
        })
    });
    return promise;
}

async function asignarNroLoteOTP(body) {
    console.log("asignarNroLoteOTP / body: ", body);
    const nro_lote = body.nro_lote;
    const SKU = body.SKU;


    const editProveedor = 'UPDATE ordenes_trabajo_producto SET nro_lote = ? WHERE nro_lote = 0 AND producto_id = (SELECT id FROM productos WHERE codigo= ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(editProveedor, [nro_lote, SKU], (err, result) => {
            if (err) {
                console.log("asignarNroLoteOTP / err: ", err);
                resolve(err);
            } else {
                console.log("asignarNroLoteOTP / result: ", result);
                resolve(result)
            }
        })
    });
    return promise;
}

async function asignarNroLotePED(body) {
    console.log("asignarNroLotePED / body: ", body);
    const nro_lote = body.nro_lote;
    const SKU = body.SKU;


    const editProveedor = 'UPDATE pedidos_detalle SET nro_lote = ? WHERE nro_lote = 0 AND producto_id = (SELECT id FROM productos WHERE codigo= ?))';
    let promise = new Promise((resolve, reject) => {
        db.query(editProveedor, [nro_lote, SKU], (err, result) => {
            if (err) {
                console.log("asignarNroLotePED / err: ", err);
                resolve(err);
            } else {
                console.log("asignarNroLotePED / result: ", result);
                resolve(result)
            }
        })
    });
    return promise;
}