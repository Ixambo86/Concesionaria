const db = require('../dbConection')

module.exports = {
    buscarProductos,
    reservarProducto,
    borrarReservaProducto,
    utilizarReservaProducto,
    buscarProductosAdicionales,
    buscarCategoriasAdicionales
};

async function buscarProductos(body) {
    console.log("buscarProductos / body: ", body)
    const fil = body.filtro.buscar ? '%' + body.filtro.buscar + '%' : '%';
    const proveedor_nombre = body.filtro.proveedor_nombre ? '%' + body.filtro.proveedor_nombre + '%' : '%'
    const marca = body.filtro.marca ? '%' + body.filtro.marca + '%' : '%'
    const precio_desde = body.filtro.precio_desde  ? body.filtro.precio_desde : 0;
    const precio_hasta = body.filtro.precio_hasta  ? body.filtro.precio_hasta : 999999999;
    const selectProductos = "select pp.* , date_format(date_add(sysdate(), interval case stock when 0 then plazo_entrega else 0 end day), '%d/%m/%Y') fecha_entrega from (" +
                            "select p.id, p.codigo, p.categoria_id, mp.descripcion marca, p.descripcion, p.precio, cp.descripcion categoria, p.stock_minimo, " +
                            "sum(coalesce(pi.stock, null,  0)-coalesce(pi.reservado, null, 0)) stock, plazo_entrega, COALESCE(min(pi.nro_lote), 0) nro_lote " +
                            "from categorias_producto cp, marcas_producto mp, proveedores pr " +
                            ", productos p LEFT JOIN productos_inventario pi ON (p.id = pi.producto_id AND (pi.stock-pi.reservado) > 0) " +
                           "where cp.id = p.categoria_id " +
                           "and p.marca_id = mp.id " +
                           "and p.proveedor_id = pr.id " +
                           "and (concat(pr.nombres, ' ', pr.apellidos) like ? or pr.razon_social like ?) " +
                           "and mp.descripcion like ? " +
                           "and p.precio between ? and ? " +
                            "and (p.codigo like ? " +
                            "or p.descripcion like ? " +
                            "or cp.descripcion like ?) " +
                           "group by p.id ) pp " +
                            "order by pp.categoria_id";
    let promise = new Promise((resolve, reject) => {
       
        db.query(selectProductos, [proveedor_nombre, proveedor_nombre, marca, precio_desde, precio_hasta, fil, fil, fil], (err, result) => {
            if (!result) {
                console.log("buscarProductos / err: ", err)
                resolve(err);
            } else {
                let ret = []
                result.map(p => {
                    const {...productos} = p;
                    ret.push(productos)
                });
                console.log("buscarProductos / ret: ", ret)
                resolve(ret)
            }
        })
            
    });
    return promise;    
}

async function reservarProducto(body) {
    console.log("reservarProducto / body:", body)
    const producto_id = body.producto_id;
    const cantidad = body.cantidad ? body.cantidad : 1;
    const nro_lote = body.nro_lote;
    const updateProductosInventario = 
        'UPDATE productos_inventario SET reservado = reservado + ? ' +
        'WHERE producto_id = ? ' + 
        'AND nro_lote = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(updateProductosInventario, [cantidad, producto_id, nro_lote], (err, result) => {
            if (err) {
                console.log("reservarProducto / err: ", err)
                resolve(err);
            } else {
                console.log("reservarProducto / result: ", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function borrarReservaProducto(body) {
    ////console.log("borrarReservaProducto / body:", body)
    const producto_id = body.producto_id
    const cantidad = body.cantidad
    const nro_lote = body.nro_lote
    const updateProductosInventario = 
        'UPDATE productos_inventario SET reservado =  reservado - ? ' +
        'WHERE producto_id = ? AND nro_lote = ? '
    let promise = new Promise((resolve, reject) => {
        db.query(updateProductosInventario, [cantidad, producto_id, nro_lote], (err, result) => {
            if (err) {
                ////console.log("borrarReservaProducto / err: ", err)
                resolve(err);
            } else {
                ////console.log("borrarReservaProducto / result: ", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function utilizarReservaProducto(body) {
    ////console.log("utilizarReservaProducto / body:", body)
    const producto_id = body.producto_id;
    const cantidad = body.cantidad ? body.cantidad : 1;
    const nro_lote = body.nro_lote;
    const updateProductosInventario = 
        'UPDATE productos_inventario SET reservado =  reservado - ?, stock = stock - ? ' +
        'WHERE producto_id = ? ' + 
        'AND nro_lote = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(updateProductosInventario, [cantidad, cantidad, producto_id, nro_lote], (err, result) => {
            if (err) {
                ////console.log("utilizarReservaProducto / err: ", err)
                resolve(err);
            } else {
                ////console.log("utilizarReservaProducto / result: ", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarProductosAdicionales(body) {
    console.log("buscarProductosAdicionales / body: ", body)
    const categoria_id = body.categoria_id ? body.categoria_id: 0;
    const version_config_id = body.version_config_id ? body.version_config_id : 0;
    const auto_id = body.automotor_id ? body.automotor_id : 0;
    const selectAdicionales = "select pp.* , date_format(date_add(sysdate(), interval case stock when 0 then plazo_entrega else 0 end day), '%d/%m/%Y') fecha_entrega from ( " +
                                "select pr.id, pr.codigo, pr.categoria_id, pr.descripcion, pr.precio, 1 cantidad, pr.stock_minimo, " +
                                "sum(coalesce(pi.stock, null,  0)-coalesce(pi.reservado, null, 0)) stock, plazo_entrega, COALESCE(min(pi.nro_lote), 0) nro_lote   " +
                                "from categorias_producto cp   " +
                                ", productos pr LEFT JOIN productos_inventario pi ON (pr.id = pi.producto_id AND (pi.stock-pi.reservado) > 0)  " +
                                "left join productos_compatibilidad pc on pr.id = pc.producto_id, " +
                                "marcas_automotor ma,  " +
                                "modelos_automotor mo,  " +
                                "versiones_automotor ve,  " +
                                "versiones_configuracion vc " +
                                "left join automotores au on au.version_config_id = vc.id " +
                                "where vc.version_id = ve.id " +
                                "and ve.modelo_id = mo.id " +
                                "and mo.marca_id = ma.id " +
                                "and (ma.id = pc.marca_id or pc.marca_id is null) " +
                                "and (mo.id = pc.modelo_id or pc.modelo_id is null) " +
                                "and (ve.id = pc.version_id or pc.version_id is null) " +
                                "and (vc.tipo_motor_id = pc.tipo_motor_id or pc.tipo_motor_id is null) " +
                                "and (coalesce(au.anio, DATE_FORMAT(sysdate(), '%Y')) between coalesce(pc.anio_desde, 1900) and coalesce(pc.anio_hasta, 2100)) " +
                                "and cp.padre_id = (select id from categorias_producto where descripcion = 'Adicionales') " +
                                "and cp.id = pr.categoria_id   " +
                                "and " + (categoria_id === 0 ? "0 = ? ": " cp.id = ? ") +
                                "and vc.id = ? " +
                                "and " + (auto_id === 0 ? "0 = ? ": " au.id = ? ") +
                                "group by pr.id ) pp " +
                                "order by pp.categoria_id ";
    let promise = new Promise((resolve, reject) => {
       
        db.query(selectAdicionales, [categoria_id, version_config_id, auto_id], (err, result) => {
            if (!result) {
                console.log("buscarProductosAdicionales / err: ", err)
                resolve(err);
            } else {
                let ret = []
                result.map(p => {
                    const {...productos} = p;
                    ret.push(productos)
                });
                console.log("buscarProductosAdicionales / ret: ", ret)
                resolve(ret)
            }
        })
            
    });
    return promise;    
}

async function buscarCategoriasAdicionales(body) {
    //console.log("buscarCategoriasAdicionales / body: ", body)
    const fil = body.automotor_id ? body.automotor_id : 0;
    const selectAdicionales = "select * from categorias_producto " + 
                            "where padre_id = (select id from categorias_producto where descripcion = 'Adicionales') " + 
                            "order by id";
    let promise = new Promise((resolve, reject) => {
       
        db.query(selectAdicionales, (err, result) => {
            if (!result) {
                //console.log("buscarCategoriasAdicionales / err: ", err)
                resolve(err);
            } else {
                let ret = []
                result.map(p => {
                    const {...productos} = p;
                    ret.push(productos)
                });
                //console.log("buscarCategoriasAdicionales / ret: ", ret)
                resolve(ret)
            }
        })
            
    });
    return promise;    
}