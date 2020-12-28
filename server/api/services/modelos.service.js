
const db = require('../dbConection')

module.exports = {
    insertarModelo,
    editarModelo,
    eliminarModelo,
    buscarModelos,
};

async function buscarModelos(filtro) {
    console.log("estoy en buscar modelos");
    const fil = filtro;
    const selectColores = 'SELECT mo.id modelo_id, us.id usuario_id, us.nombre usuario_nombre, ma.id marca_id, ma.descripcion marca_descripcion, mo.descripcion modelo_descripcion, mo.fecha_modificacion from marcas_automotor ma, usuarios us, modelos_automotor mo where ma.id = mo.marca_id and mo.eliminado = 0 and mo.usuario_id = us.id ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectColores, [], (err, result) => {
            if (!result) {
                console.log(err)
                resolve(err);
            } else {
                let ret = [];
                result.map(m => {
                    const { ...modelos } = m;
                    ret.push(modelos)
                });
                console.log(ret)
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarModelos(filtro) {
    console.log("estoy en buscar modelos");
    const fil = filtro;
    const selectColores = 'SELECT mo.id modelo_id, us.id usuario_id, us.nombre usuario_nombre, ma.id marca_id, ma.descripcion marca_descripcion, mo.descripcion modelo_descripcion, mo.fecha_modificacion from marcas_automotor ma, usuarios us, modelos_automotor mo where ma.id = mo.marca_id and mo.eliminado = 0 and mo.usuario_id = us.id ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectColores, [], (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(m => {
                    const { ...modelos } = m;
                    ret.push(modelos)
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarModelos(filtro) {
    
    const fil = filtro ? '%' + filtro + '%' : '%';;
    const selectColores = 'SELECT mo.id modelo_id, us.id usuario_id, us.nombre usuario_nombre, ma.id marca_id, ma.descripcion marca_descripcion, mo.descripcion modelo_descripcion, mo.fecha_modificacion from marcas_automotor ma, usuarios us, modelos_automotor mo where ma.id = mo.marca_id and mo.eliminado = 0 and mo.usuario_id = us.id AND mo.descripcion like ? ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectColores, [fil], (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(m => {
                    const { ...modelos } = m;
                    ret.push(modelos)
                });
                resolve(ret)
            }
        })
    });
    return promise;
}
async function insertarModelo(body) {
    console.log("estoy en insertar modelos");
    const usuario_id = body.usuario_id;
    const descripcion = body.descripcion;
    const marca_id = body.marca_id;

    const insertMarca = 'INSERT INTO modelos_automotor (marca_id, descripcion, usuario_id, fecha_modificacion) VALUES (?,?,?,sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertMarca, [marca_id, descripcion, usuario_id], (err, result) => {
            if (err) {
                console.log(err);
                resolve(err);
            } else {
                console.log(result);
                resolve(result)
            }
        })
    });
    return promise;
}


async function editarModelo(body) {
    console.log("estoy en editar modelos");
    const id = body.id;
    const usuario_id = body.usuario_id;
    const descripcion = body.descripcion;
 

    const editMarca = 'UPDATE modelos_automotor SET descripcion= ?, usuario_id= ?, fecha_modificacion=sysdate()  WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(editMarca, [descripcion, usuario_id, id], (err, result) => {
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

async function eliminarModelo(body) {
    console.log("Eliminar",body)
    const id = body.id;
    const elimMarca = 'UPDATE modelos_automotor SET eliminado = 1 WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(elimMarca, [id], (err, result) => {
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

