
const db = require('../dbConection')

module.exports = {
    insertarMarca,
    editarMarca,
    eliminarMarca,
    buscarMarcayModelos
};

async function insertarMarca(body) {

    const usuario_id = body.usuario_id;
    const descripcion = body.descripcion;

    const insertMarca = 'INSERT INTO marcas_automotor (descripcion, usuario_id, fecha_modificacion) VALUES (?,?,sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertMarca, [descripcion, usuario_id], (err, result) => {
            if (err) {
                
                resolve(err);
            } else {
                
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarMarcayModelos(filtro) {
    const fil = filtro ? '%' + filtro + '%' : '%';
    const selectMarcas = 'SELECT ma.id marca_id, ma.descripcion marca_descripcion, mo.id modelo_id, mo.descripcion modelo_descripcion, mo.marca_id modelo_marca_id FROM marcas_automotor ma, modelos_automotor mo WHERE ma.eliminado = 0 AND ma.descripcion like ? ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectMarcas, [fil], (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(m => {
                    const { ...Marcas } = m;
                    ret.push(Marcas)
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function editarMarca(body) {
    
    const id = body.id;
    const usuario_id = body.usuario_id;
    const descripcion = body.descripcion;
 

    const editMarca = 'UPDATE marcas_automotor SET descripcion= ?, usuario_id= ?, fecha_modificacion=sysdate()  WHERE id = ?';
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

async function eliminarMarca(body) {
    console.log("Eliminar",body)
    const id = body.id;
    const elimMarca = 'UPDATE marcas_automotor SET eliminado = 1 WHERE id = ?';
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

