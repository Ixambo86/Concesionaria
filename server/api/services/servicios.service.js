const db = require('../dbConection')

module.exports = {
    buscarServicios,
    obtenerProductos,
    buscarServicios2,
    insertarServicio,
    editarServicio,
    buscarCategorias,
    eliminarServicio,
    insertarCategoria
};

async function insertarCategoria(body) {

    const id = body.id;
    const descripcion = body.categoria;


    const insertServicio = 'INSERT INTO categorias_servicio (descripcion, eliminado, usuario_id, fecha_modificacion) VALUES (?, 0, ?,sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertServicio, [descripcion, id], (err, result) => {
            if (err) {
                
                resolve(err);
            } else {
                
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarCategorias() {
    const selectCategorias = 'SELECT id, descripcion FROM categorias_servicio ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectCategorias, (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(a => {
                    const { ...categorias } = a;
                    ret.push(categorias);
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarServicios(filtro) {
    const fil = filtro ? '%' + filtro + '%':'%';
    const selectServicios = 'SELECT *, 1 stock FROM servicios WHERE eliminado = 0 AND descripcion LIKE ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectServicios, [fil], (err, result) => {
            if (!result) {
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



async function buscarServicios2(filtro) {
    const fil = filtro ? '%' + filtro + '%':'%';
    const selectServicios2 = 'SELECT us.id usuario_id, us.nombre usuario_nombre, cp.id categoria_id, cp.descripcion categoria_descripcion, ' +
    " se.id id, se.codigo codigo, se.descripcion descripcion, se.precio precio, se.cantidad_modulos cantidad_modulos,  date_format(se.fecha_modificacion, '%d/%m/%Y %H:%i') fecha_modificacion " +
    ' FROM servicios se, ' +
    ' categorias_servicio cp, ' +
    ' usuarios us ' +
    ' where se.eliminado = 0 ' +
    ' and se.categoria_id = cp.id  ' +
    ' and se.usuario_id = us.id ' +
    ' and  se.descripcion LIKE ? ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectServicios2, [fil], (err, result) => {
            if (!result) {
                
                resolve(err);
            } else {
                let ret = [];
                result.map(a => {
                    const {...servicios2} = a;
                    ret.push(servicios2)
                });
                
                resolve(ret)
            }
        })
    });
    return promise;    
}

async function insertarServicio(body) {

    const id = body.id;
    const categoria_id = body.categoria_id;
    const descripcion = body.descripcion;
    const precio = body.precio;
    const cantidad_modulos = body.cantidad_modulos;

    const insertServicio = 'INSERT INTO servicios (codigo, categoria_id, descripcion, precio, cantidad_modulos, eliminado, usuario_id, fecha_modificacion) VALUES ((select concat("S", lpad((select COALESCE(max(ot.id), 0)+1 from servicios ot), 5, "0"))),?,?,?,?, 0, ?,sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertServicio, [categoria_id, descripcion, precio, cantidad_modulos, id], (err, result) => {
            if (err) {
                
                resolve(err);
            } else {
                
                resolve(result)
            }
        })
    });
    return promise;
}

async function editarServicio(body) {
    console.log("body",body)
    const id = body.id;
    const usuario_id = body.usuario_id;
    const categoria_id = body.categoria_id;
    const descripcion = body.descripcion;
    const precio = body.precio;
    const cantidad_modulos = body.cantidad_modulos;
    console.log("id",id)

    const editServicio = 'UPDATE servicios SET categoria_id= ?, descripcion= ?, precio= ?, cantidad_modulos= ?, usuario_id= ?, fecha_modificacion=sysdate()  WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(editServicio, [categoria_id, descripcion, precio, cantidad_modulos, usuario_id, id], (err, result) => {
            if (err) {
                console.log("error",err)
                resolve(err);
            } else {
                console.log("result",result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function obtenerProductos(servicios_id, automotor_id) {
    console.log("obtenerProductos / body: ", {servicios_id, automotor_id})
    const serv_id = servicios_id ? servicios_id : 0;
    const auto_id = automotor_id ? automotor_id: 0;
    const selectProductos = "select pp.* , date_format(date_add(sysdate(), interval case stock when 0 then plazo_entrega else 0 end day), '%d/%m/%Y') fecha_entrega from ( " +
                                "select pr.id, pr.codigo, pr.categoria_id, pr.descripcion, pr.precio, spc.cantidad, pr.stock_minimo, " +
                                "sum(coalesce(pi.stock, null,  0)-coalesce(pi.reservado, null, 0)) stock, plazo_entrega, COALESCE(min(pi.nro_lote), 0) nro_lote   " +
                                "from servicios s  " +
                                ", servicios_productos_categoria spc   " +
                                ", categorias_producto cp   " +
                                ", productos pr LEFT JOIN productos_inventario pi ON (pr.id = pi.producto_id AND (pi.stock-pi.reservado) > 0)  " +
                                "left join productos_compatibilidad pc on pr.id = pc.producto_id, " +
                                "marcas_automotor ma,  " +
                                "modelos_automotor mo,  " +
                                "versiones_automotor ve,  " +
                                "versiones_configuracion vc,  " +
                                "automotores au " +
                                "where au.version_config_id = vc.id " +
                                "and vc.version_id = ve.id " +
                                "and ve.modelo_id = mo.id " +
                                "and mo.marca_id = ma.id " +
                                "and (ma.id = pc.marca_id or pc.marca_id is null) " +
                                "and (mo.id = pc.modelo_id or pc.modelo_id is null) " +
                                "and (ve.id = pc.version_id or pc.version_id is null) " +
                                "and (vc.tipo_motor_id = pc.tipo_motor_id or pc.tipo_motor_id is null) " +
                                "and (au.anio between coalesce(pc.anio_desde, 1900) and coalesce(pc.anio_hasta, 2100)) " +
                                "and s.id in (?)   " +
                                "and s.id = spc.servicio_id " +  
                                "and (spc.categ_prod_id = cp.padre_id   " +
                                "or spc.categ_prod_id = cp.id)   " +
                                "and cp.id = pr.categoria_id   " +
                                "and " + (auto_id === 0 ? "0 = ? ": " au.id = ? ") +
                                "group by pr.id ) pp " +
                                "order by pp.categoria_id ";
        
    let promise = new Promise((resolve, reject) => {
       
        db.query(selectProductos, [serv_id, auto_id], (err, result) => {
            if (!result) {
                console.log("obtenerProductos / err: ", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(p => {
                    const {...productos} = p;
                    ret.push(productos)
                });
                console.log("obtenerProductos / ret: ", ret)
                resolve(ret)
            }
        })
            
    });
    return promise;    
}

async function eliminarServicio(body) {
    const id = body.id;
    const elimServicio = 'UPDATE servicios SET eliminado = 1 WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(elimServicio, [id], (err, result) => {
            if (err) {
                //console.log("error",err)
                resolve(err);
            } else {
                //console.log("result",result)
                resolve(result)
            }
        })
    });
    return promise;
}