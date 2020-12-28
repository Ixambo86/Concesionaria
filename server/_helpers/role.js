/*
const db = require('../api/dbConection');

const Roles = getRoles();

async function getRoles() {
    const selectRoles = 'SELECT descripcion FROM roles'
    let promise = new Promise((resolve, reject) => {
        db.query(selectRoles, (err, result) => {
            if (err) {
                reject(err);
            } else {
                let ret = [];
                result.forEach(e => {
                    ret.push(e.descripcion);
                })
                resolve(ret)
            }
        })
    })
    return promise
}
*/

const Roles = {
    Administrador: 'Administrador',
    Usuario: 'Usuario'
}

module.exports = Roles
