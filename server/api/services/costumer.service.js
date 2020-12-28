const db = require('../dbConection')

module.exports = {
    buscarCostumers,
    editarMsj
};

async function buscarCostumers() {
    const selectCostumer = 'SELECT * FROM costumer';
    let promise = new Promise((resolve, reject) => {
        db.query(selectCostumer, (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(m => {
                    const { ...costumer } = m;
                    ret.push(costumer)
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function editarMsj(body) {
    const id = body.id;
    const asunto = body.asunto;
    const titulo = body.titulo;
    const mensaje = body.mensaje;
    const editMsj = 'UPDATE costumer SET asunto= ?, titulo= ?, mensaje= ?  WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(editMsj, [asunto, titulo, mensaje, id], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                resolve(result)
            }
        })
    });
    return promise;
}