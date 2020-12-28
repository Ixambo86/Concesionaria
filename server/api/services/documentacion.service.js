const db = require('../dbConection')

module.exports = {
    buscarDocumentos,
    insertarDocumento,
    actualizarDocumento,
    eliminarDocumento
};

async function buscarDocumentos(body) {
    console.log("buscarDocumentos / body", body)
    const buscar = body.filtro ? '%' + body.filtro + '%':'%';
    
    const selectDocumentos = 'SELECT d.id, d.descripcion, d.exigido_a, DATE_FORMAT(d.fecha_desde, "%Y-%m-%d") fecha_desde, DATE_FORMAT(d.fecha_hasta, "%Y-%m-%d") fecha_hasta, ' +
                            'DATE_FORMAT(d.fecha_desde, "%d/%m/%Y") fecha_desde_str, coalesce(DATE_FORMAT(d.fecha_hasta, "%d/%m/%Y"), "Sin definir") fecha_hasta_str, '+
                            ' d.usuario_id, u.nombre usuario ' +
                            ' FROM documentos_entrega d, usuarios u ' +
                            ' WHERE u.id = d.usuario_id '+
                            ' AND d.eliminado = 0 ' +
                            'and d.descripcion like ? ' +
                            'and d.exigido_a like ? '; 
    let promise = new Promise((resolve, reject) => {
        db.query(selectDocumentos, [buscar, buscar], (err, result) => {
            if (!result) {
                console.log("buscarDocumentos / err", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(f => {
                    const {...factu } = f;
                    ret.push(factu)
                });
                console.log("buscarDocumentos / ret", ret)
                resolve(ret)
            }
        })
    });
    return promise;    
}

async function insertarDocumento(body) {
    console.log("insertarDocumento / body", body)
    const descripcion = body.descripcion;
    const exigido_a = body.exigido_a;
    const fecha_desde = body.fecha_desde ? body.fecha_desde: new Date();
    const fecha_hasta = body.fecha_hasta === "Sin definir" ? null : body.fecha_hasta;
    const usuario_id = body.usuario_id
    const insertFactura = 'INSERT INTO documentos_entrega(fecha_hora, descripcion, exigido_a, fecha_desde, fecha_hasta, usuario_id, fecha_modificacion) ' +
                        'VALUES(sysdate(), ?, ?, ?, ?, ?, sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertFactura, [descripcion, exigido_a, fecha_desde, fecha_hasta, usuario_id], (err, result) => {
            if (err) {
                console.log("insertarDocumento / err", err)
                resolve(err);
            } else {
                console.log("insertarDocumento / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}

async function actualizarDocumento(body) {
    console.log("actualizarDocumento / body", body)
    const descripcion = body.descripcion;
    const exigido_a = body.exigido_a;
    const fecha_desde = body.fecha_desde;
    const fecha_hasta = body.fecha_hasta === "Sin definir" ? null : body.fecha_hasta;
    const usuario_id = body.usuario_id
    const documento_id = body.id
    const updateFactura = 'UPDATE documentos_entrega SET ' + 
                            'descripcion = ?, exigido_a = ?, fecha_desde = ?, fecha_hasta = ?, usuario_id = ?, fecha_modificacion = sysdate() ' +
                            'WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(updateFactura, [descripcion, exigido_a, fecha_desde, fecha_hasta, usuario_id, documento_id], (err, result) => {
            if (err) {
                console.log("actualizarDocumento / err", err)
                resolve(err);
            } else {
                console.log("actualizarDocumento / result", result)
                resolve(result)
            }
        })
    });
    return promise;
}


async function eliminarDocumento(body) {
    const documento_id = body.documento_id
    const usuario_id = body.usuario_id

    ////console.log("eliminarDocumento / body: ", body)
    const eliminar = 'UPDATE documentos_entrega SET eliminado = 1, usuario_id = ?, fecha_modificacion = sysdate() WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(eliminar, [usuario_id, documento_id], (err, result) => {
            if (err) {
                ////console.log("eliminarDocumento / err: ",err)
                resolve(err);
            } else {
                ////console.log("eliminarDocumento / result: ",result)
                resolve(result)
            }
        })
    });
    return promise;
}
