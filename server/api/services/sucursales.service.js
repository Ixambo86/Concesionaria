const db = require('../dbConection')

module.exports = {
    buscarSucursales,
    buscarSucursal,
    insertarSucursal,
    editarSucursal,
    eliminarSucursal,
    InsertarNuevaLicalidad

};

async function InsertarNuevaLicalidad(body) {
        
    const nombre = body.localidad;

    
    const insertLocalidad = 'INSERT INTO localidades (nombre, provincia_id) VALUES (?,1)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertLocalidad, [nombre], (err, result) => {
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

async function buscarSucursales(filtro) {
    const fil = filtro ? '%' + filtro + '%' : '%';
    const selectSucursales = 'SELECT lo.id localidad_id, lo.nombre localidad_nombre, pa.nombre pais_nombre, pa.id pais_id, pr.nombre provincia_nombre, pr.id provincia_id, su.id sucursal_id, su.nombre sucursal_nombre, su.telefono sucursal_telefono, su.email sucursal_email, su.calle sucursal_calle, su.altura sucursal_altura, su.cant_mecanicos sucursal_cant_mecanicos FROM paises pa, provincias pr, sucursales su, localidades lo where su.eliminado = 0 and su.localidad_id = lo.id and su.pais_id = pa.id and su.provincia_id = pr.id' ;
    let promise = new Promise((resolve, reject) => {
        db.query(selectSucursales, [], (err, result) => {
            if (!result) {
                
                resolve(err);
            } else {
                let ret = [];
                result.map(c => {
                    const { ...sucursales } = c;
                    ret.push(sucursales)
                });
                
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarSucursal(id) {
    const sucur_id = id;
    const selectSucursal = 'SELECT * FROM sucursales su where su.eliminado = 0 and su.id = ?' ;
    let promise = new Promise((resolve, reject) => {
        db.query(selectSucursal, [sucur_id], (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                resolve(result)
            }
        })
    });
    return promise;
}

async function insertarSucursal(body) {
        
    const nombre = body.nombre;
    const calle = body.calle;
    const altura = body.altura;
    const localidad_id = body.localidad_id;
    const pais_id = body.pais_id;
    const provincia_id = body.provincia_id;
    const cant_mecanicos = body.cant_mecanicos;
    const telefono = body.telefono;
    const email = body.email;
    
    const insertSucursal = 'INSERT INTO sucursales (nombre, calle, altura, localidad_id, pais_id, provincia_id, cant_mecanicos, telefono, email, eliminado) VALUES (?,?,?,?,?,?,?,?,?, 0)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertSucursal, [nombre, calle, altura, localidad_id, pais_id, provincia_id, cant_mecanicos, telefono, email], (err, result) => {
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

async function editarSucursal(body) {
    console.log("estoy en editar sucursales")
    console.log(body)

    const id = body.id;
    const nombre = body.nombre;
    const calle = body.calle;
    const altura = body.altura;
    const localidad_id = body.localidad_id;
    const pais_id = body.pais_id;
    const provincia_id = body.provincia_id;
    const cant_mecanicos = body.cant_mecanicos;
    const telefono = body.telefono;
    const email = body.email;

    const editAutomotor = 'UPDATE sucursales SET nombre= ?, calle= ?, altura= ?, localidad_id= ?, pais_id =?, provincia_id = ? , cant_mecanicos= ?, telefono= ?, email= ? WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(editAutomotor, [ nombre, calle, altura, localidad_id, pais_id, provincia_id,  cant_mecanicos, telefono, email, id ],
            (err, result) => {
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


async function eliminarSucursal(body) {
    const id = body.id;
    
    const elimProductos = 'UPDATE sucursales SET eliminado = 1 WHERE id = ?';
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