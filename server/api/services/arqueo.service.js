const db = require('../dbConection')

module.exports = {
    guardarArqueo,
    buscarArqueo
};

async function guardarArqueo(body) {
    const sucur_id = body.sucur_id;
    const ingreso = body.ingreso;
    const egreso = body.egreso;
    const fecha = body.fecha;
    //const ganancia = body.ganacia;
    const estado = body.estado;
    const usuario_id = body.usuario_id;
    const insertArqueo = 'INSERT INTO arqueos(sucursal_id, fecha, ingreso, egreso, estado, usuario_id) VALUES(?, ?, ?, ?, ?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertArqueo, [sucur_id, fecha, ingreso, egreso, /*ganancia,*/ estado, usuario_id], (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                resolve(result)
            }
        })
    });
    return promise;    
}

async function buscarArqueo(body) {
    const sucur_id = body.sucur_id;
    const fecha = body.fecha;
    const selectArqueo = 'SELECT * FROM arqueos WHERE sucursal_id = ? AND fecha = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectArqueo, [sucur_id, fecha], (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                resolve(result)
            }
        })
    });
    return promise;    
}