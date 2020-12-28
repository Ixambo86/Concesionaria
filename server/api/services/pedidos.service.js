const db = require('../dbConection')

module.exports = {
    buscarPedidos,
    eliminarPedido,
    actualizarPedido,
    insertarPedido,
    buscarProductosPedido,
    borrarProductosPedido,
    insertarProductosPedido,
    insertarHistoriaPedido,
    buscarHistoriaPedido,
    asignarFactura,
    buscarDocumentosPedido,
    insertarDocumentosPedido,
    actualizarDocumentosPedido,
    asignarAutomotorCliente,
    obtenerPedidosSinAutomotor,
    asignarAutomotorPedido
};

async function buscarPedidos(body) {
    console.log("buscarPedido / body: ", body)
    const fil = body.filtro.buscar ? '%' + body.filtro.buscar + '%':'%';
    const estado = body.filtro.estado ? '%' + body.filtro.estado + '%' : '%'
    const cliente_nombre = body.filtro.cliente_nombre ? '%' + body.filtro.cliente_nombre + '%' : '%'
    const sucursal = body.filtro.sucursal ? '%' + body.filtro.sucursal + '%' : '%'
    const fecha_desde = body.filtro.fecha_desde  ? body.filtro.fecha_desde + ' 00:00:00': '1900-01-01';
    const fecha_hasta = body.filtro.fecha_hasta  ? body.filtro.fecha_hasta + ' 23:59:59': '2100-12-31';
    const id = body.pedido_id ? body.pedido_id: 0;
    const selectPedidos = "select pe.id, pe.nro_pedido, date_format(pe.fecha_hora, '%d/%m/%Y %H:%i') fecha_hora, pe.importe, pe.estado, date_format(pe.fecha_entrega, '%d/%m/%Y %H:%i') fecha_entrega, "+
                            "cl.id cliente_id, cl.nro_cliente cliente_nro, concat(cl.nombres, ' ', cl.apellidos) cliente_nombre, cl.razon_social cliente_razon_social, cl.email cliente_email, " + 
                            "cl.telefono cliente_telefono, cl.documento cliente_documento, ci.descripcion cliente_condicion_iva, ci.tipo_factura cliente_tipo_factura, " + 
                            "pe.automotor_id, coalesce(au.dominio, 'SIN ESPECIFICAR') automotor_dominio, coalesce(au.km, 0) automotor_km, tm.descripcion automotor_motor, " + 
                            " coalesce(au.precio, vc.precio) automotor_precio, vc.id version_config_id, vc.origen automotor_origen, pe.usuario_id, pe.bonificacion, "+
                            "mo.id modelo_id, concat(ma.descripcion, ' ', mo.descripcion, ' ', va.descripcion) automotor_descripcion, us.nombre usuario, su.nombre sucursal " +
                            "from pedidos pe left join automotores au on pe.automotor_id = au.id "+
                            "left join usuarios us on pe.usuario_id = us.id " + 
                            "left join sucursales su on us.sucursal_id = su.id " + 
                            "left join versiones_configuracion vc on pe.version_config_id = vc.id "+     
                            "left join tipos_motor tm on vc.tipo_motor_id = tm.id "+
                            "left join versiones_automotor va on vc.version_id = va.id "+
                            "left join modelos_automotor mo  on va.modelo_id = mo.id "+
                            "left join marcas_automotor ma on mo.marca_id = ma.id, "+
                            "clientes cl ," +
                            "condiciones_iva ci " +
                            "where pe.eliminado = 0 " + 
                            "and pe.cliente_id = cl.id " +
                            "and cl.condicion_iva_id = ci.id " +
                            "and pe.estado like ? " +
                            "and (concat(cl.nombres, ' ', cl.apellidos) like ? or cl.razon_social like ?) " +
                            "and su.nombre like ? " +
                            "and pe.fecha_hora between ? and ? " +
                            "and (pe.nro_pedido like ? " +
                            " or cl.documento like ?) " + 
                        (id === 0 ? "and 0 = ? ":" and pe.id = ? ") + 
                        "ORDER BY pe.fecha_hora";
    let promise = new Promise((resolve, reject) => {
        db.query(selectPedidos, [estado, cliente_nombre, cliente_nombre, sucursal, fecha_desde, fecha_hasta, fil, fil, id], (err, result) => {
            if (!result) {
                console.log("buscarPedido / err: ", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(pe => {
                    const {...pedido} = pe;
                    ret.push(pedido)
                });
                console.log("buscarPedido / ret: ", ret)
                resolve(ret)
            }
        })
    });
    return promise;
}

async function actualizarPedido(body) {
    //console.log("actualizarPedido / body", body)
    const nro_pedido = body.nro_pedido;
    const cliente_id = body.cliente_id;
    const automotor_id = body.automotor_id;
    const importe = body.importe;
    const estado = body.estado;
    const pedido_id = body.pedido_id;
    const usuario_id = body.usuario_id;
    const updatePedido = 'UPDATE pedidos SET cliente_id = ?, automotor_id = ?, importe = ?, estado = ?, usuario_id = ? ' +
                        (estado === "ENTREGADO" ? ', fecha_entrega = sysdate() ': '') + 
                        ' WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(updatePedido, [cliente_id, automotor_id, importe, estado, usuario_id, pedido_id], (err, result) => {
            if (err) {
                //console.log("actualizarPedido / err", err)
                resolve(err);
            } else {
                //console.log("actualizarPedido / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function eliminarPedido(body) {
    ////console.log("eliminarPedido: ", body)
    const id = body.pedido_id;
    const deletePedido = 'UPDATE pedidos SET eliminado = 1 WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(deletePedido, [id], (err, result) => {
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

async function insertarPedido(body) {
    console.log("insertarPedido / body", body)
    const cliente_id = body.cliente_id;
    const version_config_id = body.version_config_id;
    const automotor_id = body.automotor_id;
    const estado = body.estado;
    const bonificacion = body.bonificacion;
    const importe = body.importe;
    const usuario_id = body.usuario_id
    const insertPedido = 'INSERT INTO pedidos(fecha_hora, nro_pedido, cliente_id, version_config_id, automotor_id, bonificacion, importe, estado, usuario_id, fecha_modificacion) ' +
                        'VALUES(sysdate(), (select concat("PE", lpad((select COALESCE(max(pe.id), 0)+1 from pedidos pe), 8, "0"))), ?, ?, ?, ?, ?, ?, ?, sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertPedido, [cliente_id, version_config_id, automotor_id, bonificacion, importe, estado, usuario_id], (err, result) => {
            if (err) {
                console.log("insertarPedido / err", err)
                resolve(err);
            } else {
                console.log("insertarPedido / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarProductosPedido(body) {
    console.log("buscarProductosPedido / body: ", body)
    const id = body.pedido_id;
    const selectProductos = "select pp.* , date_format(date_add(sysdate(), interval case stock when 0 then plazo_entrega else 0 end day), '%d/%m/%Y') fecha_entrega from (" +
                                "select p.id, p.codigo, p.categoria_id, ped.item, p.descripcion, ped.precio, ped.cantidad, ped.importe, p.stock_minimo, " +
                                "sum(coalesce(pi.stock, null,  0)-coalesce(pi.reservado, null, 0)) stock, plazo_entrega, COALESCE(min(pi.nro_lote), 0) nro_lote " +
                                "from categorias_producto cp " +
                                ", productos p LEFT JOIN productos_inventario pi ON (p.id = pi.producto_id AND (pi.stock-pi.reservado) > 0) " +
                                ", pedidos_detalle ped " +
                                "WHERE p.id = ped.producto_id " + 
                                "AND ped.pedido_id = ? " +
                                "AND cp.id = p.categoria_id " +
                                "group by p.id ) pp " +                            
                             "order by pp.item";
    let promise = new Promise((resolve, reject) => {
        db.query(selectProductos, [id], (err, result) => {
            if (err) {
                console.log("buscarProductosPedido / err: ", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(p => {
                    const {...productos} = p;
                    ret.push(productos)
                });
                console.log("buscarProductosPedido / ret: ", ret)
                resolve(ret)
            }
        })
    });
    return promise;
}

async function borrarProductosPedido(body) {
    //console.log("borrarProductosPedido / body", body)
    const id = body.pedido_id;
    const deleteProductos = 'DELETE FROM pedidos_detalle WHERE pedido_id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(deleteProductos, [id], (err, result) => {
            if (err) {
                //console.log("borrarProductosPedido / err", err)
                resolve(err);
            } else {
                //console.log("borrarProductosPedido / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function insertarProductosPedido(body) {
    const pedido_id = body.pedido_id
    const item = body.item
    const producto_id = body.producto_id
    const precio = body.precio
    const cantidad = body.cantidad ? body.cantidad : 1;
    const importe = body.importe
    const nro_lote = body.nro_lote
    console.log("insertarProductosPedido / body", body)
    const insertProductos = 'INSERT INTO pedidos_detalle(pedido_id, item, producto_id, precio, cantidad, importe, nro_lote) VALUES(?, ?, ?, ?, ?, ?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertProductos, [pedido_id, item, producto_id, precio, cantidad, importe, nro_lote], (err, result) => {
            if (err) {
                console.log("insertarProductosPedido / err", err)
                resolve(err);
            } else {
                console.log("insertarProductosPedido / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function insertarHistoriaPedido(body) {
    const pedido_id = body.pedido_id
    const observacion = body.observacion
    const usuario_id = body.usuario_id

    //console.log("insertarHistoriaPedido / body: ", body)
    const insertHistoria = 'INSERT INTO pedidos_observacion(fecha_hora, pedido_id, observacion, usuario_id) VALUES(sysdate(), ?, ?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertHistoria, [pedido_id, observacion, usuario_id], (err, result) => {
            if (err) {
                //console.log("insertarHistoriaPedido / err: ",err)
                resolve(err);
            } else {
                //console.log("insertarHistoriaPedido / result: ",result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarHistoriaPedido(body) {
    console.log("buscarHistoriaOrden / body: ",body)
    const pedido_id = body.pedido_id;
    const selectHistoria = "SELECT peo.id, DATE_FORMAT(peo.fecha_hora, '%d/%m/%Y %h:%i') fecha, peo.observacion, u.nombre " + 
                            "FROM pedidos_observacion peo, usuarios u " +
                            "WHERE u.id = peo.usuario_id " +
                            "AND peo.pedido_id = ? " +
                            "order by peo.fecha_hora DESC";
    let promise = new Promise((resolve, reject) => {
        db.query(selectHistoria, [pedido_id], (err, result) => {
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

async function asignarFactura(body) {
    console.log("asignaFactura / body", body)
    const pedido_id = body.pedido_id;
    const factura_id = body.factura_id;
    const updatePedido = 'UPDATE pedidos SET factura_id = ? ' + 
                        ' WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(updatePedido, [factura_id, pedido_id], (err, result) => {
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

async function buscarDocumentosPedido(body) {
    console.log("buscarDocumentosPedido / body: ",body)
    const pedido_id = body.pedido_id;
    const selectHistoria = "SELECT doc.id, DATE_FORMAT(ped.fecha_modificacion, '%d/%m/%Y %h:%i') fecha_modificacion, doc.descripcion documento, ped.entregado, u.nombre usuario " + 
                            "FROM pedidos_documentacion ped, documentos_entrega doc, usuarios u " +
                            "WHERE u.id = ped.usuario_id " +
                            "AND ped.documento_id = doc.id "
                            "AND ped.pedido_id = ? " +
                            "order by doc.descripcion";
    let promise = new Promise((resolve, reject) => {
        db.query(selectHistoria, [pedido_id], (err, result) => {
            if (err) {
                console.log("buscarDocumentosPedido / err: ",err)
                resolve(err);
            } else {
                let ret = [];
                result.map(h => {
                    const {...historia} = h;
                    ret.push(historia)
                });
                console.log("buscarDocumentosPedido / ret: ",ret)
                resolve(ret)
            }
        })
    });
    return promise;
}

async function insertarDocumentosPedido(body) {
    const pedido_id = body.pedido_id
    const version_config_id = body.version_config_id
    const usuario_id = body.usuario_id
    console.log("insertarDocumentosPedido / body", body)
    const insertProductos = 'INSERT INTO pedidos_documentacion(pedido_id, documento_id, entregado, usuario_id, fecha_modificacion) '+ 
                            'SELECT ?, doc.id, 0, ?, sysdate() ' +
                            'FROM documentos_entrega doc, versiones_configuracion vc ' +
                            'WHERE (doc.exigido_a = "TODOS" OR vc.origen = doc.exigido_a) ' +
                            'AND vc.id = ? ' ;
    let promise = new Promise((resolve, reject) => {
        db.query(insertProductos, [pedido_id, usuario_id, version_config_id], (err, result) => {
            if (err) {
                console.log("insertarDocumentosPedido / err", err)
                resolve(err);
            } else {
                console.log("insertarDocumentosPedido / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function actualizarDocumentosPedido(body) {
    console.log("actualizarDocumentosPedido / body", body)
    const pedido_id = body.pedido_id;
    const documento_id = body.documento_id;
    const entregado = body.entregado;
    const updatePedido = 'UPDATE pedidos_documentacion SET entregado = ? ' + 
                        ' WHERE pedido_id = ? AND documento_id = ? ';
    let promise = new Promise((resolve, reject) => {
        db.query(updatePedido, [entregado, pedido_id, documento_id], (err, result) => {
            if (err) {
                console.log("actualizarDocumentosPedido / err", err)
                resolve(err);
            } else {
                console.log("actualizarDocumentosPedido / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function asignarAutomotorCliente(body) {
    console.log("asignarAutomotorCliente / body", body)
    const cliente_id = body.cliente_id;
    const automotor_id = body.automotor_id;

    const updatePedido = 'UPDATE automotores SET cliente_id = ? ' + 
                        ' WHERE automotor_id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(updatePedido, [cliente_id, automotor_id], (err, result) => {
            if (err) {
                console.log("asignarAutomotorCliente / err", err)
                resolve(err);
            } else {
                console.log("asignarAutomotorCliente / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function obtenerPedidosSinAutomotor(body) {
    console.log("obtenerPedidosSinAutomotor / body: ",body)
    const version_config_id = body.version_config_id;
    const selectHistoria = "SELECT id, nro_pedido " + 
                            "FROM pedidos " +
                            "WHERE automotor_id is null " +
                            "AND version_config_id = ? " +
                            "order by id";
    let promise = new Promise((resolve, reject) => {
        db.query(selectHistoria, [version_config_id], (err, result) => {
            if (err) {
                console.log("obtenerPedidosSinAutomotor / err: ",err)
                resolve(err);
            } else {
                let ret = [];
                result.map(h => {
                    const {...historia} = h;
                    ret.push(historia)
                });
                console.log("obtenerPedidosSinAutomotor / ret: ",ret)
                resolve(ret)
            }
        })
    });
    return promise;
}

async function asignarAutomotorPedido(body) {
    console.log("asignarAutomotorPedido / body", body)
    const pedido_id = body.pedido_id;
    const automotor_id = body.automotor_id;

    const updatePedido = 'UPDATE pedidos SET automotor_id = ? ' + 
                        ' WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(updatePedido, [automotor_id, pedido_id], (err, result) => {
            if (err) {
                console.log("asignarAutomotorPedido / err", err)
                resolve(err);
            } else {
                console.log("asignarAutomotorPedido / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}