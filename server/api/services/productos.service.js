const db = require('../dbConection')

module.exports = {
    buscarProductos,
    buscarMarcas,
    buscarCategorias,
    buscarProveedores,
    insertarProducto,
    editarProducto,
    eliminarProducto,
    insertarCategoria
};

async function insertarCategoria(body) {

    const id = body.id;
    const categoria = body.categoria;

    const insertProveedor = 'INSERT INTO categorias_producto (descripcion, eliminado, usuario_id, fecha_modificacion) VALUES (?, 0, ?,sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertProveedor, [categoria, id], (err, result) => {
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

async function buscarProductos(filtro) {
    const fil = filtro ? '%' + filtro + '%' : '%';
    const selectProductos = 'SELECT us.id usuario_id, us.nombre usuario_nombre, prov.id proveedor_id, prov.nro_proveedor proveedor_nro, ' +
        ' cp.id categoria_id, cp.descripcion categoria_descripcion, mp.id marca_id, mp.descripcion marca_descripcion, ' +
        ' prod.id producto_id, prod.codigo producto_codigo, prod.descripcion producto_descripcion, prod.detalle producto_detalle, prod.costo producto_costo, ' +
        " prod.precio producto_precio, prod.stock_minimo producto_stock_minimo, prod.compra_minima producto_compra_minima, prod.plazo_entrega producto_plazo_entrega, date_format(prod.fecha_modificacion, '%d/%m/%Y %H:%i')  producto_fecha_modificacion " +
        ' FROM productos prod, ' +
        ' marcas_producto mp, ' +
        ' categorias_producto cp, ' +
        ' proveedores prov, ' +
        ' usuarios us ' +
        ' where prod.eliminado = 0 ' +
        ' and prod.marca_id = mp.id ' +
        ' and prod.categoria_id = cp.id  ' +
        ' and prod.proveedor_id = prov.id' +
        ' and prod.usuario_id = us.id ' + 
        "and (prod.codigo like ? " +
        "or prod.descripcion like ? " +
        "or cp.descripcion like ? " + 
        "or mp.descripcion like ?) " ;
    let promise = new Promise((resolve, reject) => {
        db.query(selectProductos, [fil, fil, fil, fil], (err, result) => {
            if (!result) {
                
                resolve(err);
            } else {
                let ret = [];
                result.map(c => {
                    const { ...productos } = c;
                    ret.push(productos)
                });
                
                resolve(ret)
            }
        })
    });
    return promise;
}
async function buscarMarcas() {
    const selectMarcas = 'SELECT id, descripcion FROM marcas_producto ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectMarcas, (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(a => {
                    const { ...marcas } = a;
                    ret.push(marcas);
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarCategorias() {
    const selectCategorias = 'SELECT id, descripcion FROM categorias_producto ';
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

async function buscarProveedores() {
    const selectProveedores = 'SELECT id, nro_proveedor, razon_social, documento FROM proveedores where eliminado = 0 ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectProveedores, (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(a => {
                    const { ...proveedores } = a;
                    ret.push(proveedores);
                });
                resolve(ret)
            }
        })
    });
    return promise;
}


async function insertarProducto(body) {

    const id = body.id;
    const marca_id = body.marca_id;
    const categoria_id = body.categoria_id;
    const descripcion = body.producto_descripcion;
    const detalle = body.producto_detalle;
    const precio = body.producto_precio;
    const costo = body.producto_costo;
    const stock_minimo = body.producto_stock_minimo;
    const compra_minima = body.producto_compra_minima;
    const plazo_entrega = body.producto_plazo_entrega;
    const proveedor_id = body.proveedor_id;

    const insertProveedor = 'INSERT INTO productos (codigo, marca_id, categoria_id, descripcion, detalle, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id , eliminado, usuario_id, fecha_modificacion) VALUES ((select concat("GEN", lpad((select COALESCE(max(ot.id), 0)+1 from productos ot), 2, "0"))),?,?,?,?,?,?,?,?,?,?, 0, ?,sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertProveedor, [marca_id, categoria_id, descripcion, detalle, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id, id], (err, result) => {
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

async function editarProducto(body) {
    const usuario_id = body.usuario_id;
    const id = body.producto_id;
    const marca_id = body.marca_id;
    const categoria_id = body.categoria_id;
    const descripcion = body.producto_descripcion;
    const detalle = body.producto_detalle;
    const precio = body.producto_precio;
    const costo = body.producto_costo;
    const stock_minimo = body.producto_stock_minimo;
    const compra_minima = body.producto_compra_minima;
    const plazo_entrega = body.producto_plazo_entrega;
    const proveedor_id = body.proveedor_id;


    const editProveedor = 'UPDATE productos SET marca_id= ?, categoria_id= ?, descripcion= ?, detalle= ?, costo= ?, precio= ?, stock_minimo= ?, compra_minima= ?, plazo_entrega= ?, proveedor_id= ?, usuario_id =?, fecha_modificacion=sysdate()  WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(editProveedor, [marca_id, categoria_id, descripcion, detalle, costo, precio, stock_minimo, compra_minima, plazo_entrega, proveedor_id,usuario_id, id], (err, result) => {
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

async function eliminarProducto(body) {
    const id = body.id;
    
    const elimProductos = 'UPDATE productos SET eliminado = 1 WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(elimProductos, [id], (err, result) => {
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





