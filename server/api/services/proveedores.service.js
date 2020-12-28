const db = require('../dbConection')

module.exports = {
    buscarProveedores,
    buscarTipoDocumentos,
    buscarLocalidades,
    buscarProvincias,
    buscarPaises,
    insertarProveedor,
    editarProveedor,
    eliminarProveedor,
    verificarProveedorEliminado,
    buscarIvas,
    insertarPais,
    insertarProvincia,
    insertarLocalidad
};

async function insertarLocalidad(body) {
    console.log("insertar localidad")
    console.log(body)
    const descripcion = body.descripcion;
    const provincia_id = body.provincia;

    const insertLocalidad = 'INSERT INTO localidades (nombre, provincia_id) VALUES (?,?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertLocalidad, [descripcion, provincia_id], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err);
            } else {
                console.log(err)
                resolve(result)
            }
        })
    });
    return promise;
}

async function insertarProvincia(body) {
    console.log("insertar provincia")
    console.log(body)
    const descripcion = body.descripcion;
    const pais_id = body.pais;

    const insertProvincia = 'INSERT INTO provincias (nombre, pais_id) VALUES (?,?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertProvincia, [descripcion, pais_id], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err);
            } else {
                console.log(err)
                resolve(result)
            }
        })
    });
    return promise;
}

async function insertarPais(body) {
    console.log(body)
    const descripcion = body.descripcion;

    const insertPais = 'INSERT INTO paises (nombre) VALUES (?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertPais, [descripcion], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err);
            } else {
                console.log(err)
                resolve(result)
            }
        })
    });
    return promise;
}

async function buscarIvas() {
    const selectbuscarIvas = 'SELECT id, descripcion, tipo_factura FROM condiciones_iva ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectbuscarIvas, (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(a => {
                    const { ...ivas } = a;
                    ret.push(ivas);
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarProveedores(filtro) {
    const fil = filtro ? '%' + filtro + '%' : '%';
    const selectProveedores = 'SELECT pa.nombre pais_nombre, pa.id pais_id, pro.nombre provincia_nombre, pr.id provincia_id, us.id usuario_id, us.nombre usuario_nombre, lo.id localidad_id, lo.nombre localidad_nombre, td.id tipo_documento_id, td.descripcion tipo_documento_descripcion, ' +
        ' pr.id proveedor_id, pr.nro_proveedor proveedor_nro, pr.nombres proveedor_nombre, pr.apellidos proveedor_apellido, ' +
        ' pr.genero proveedor_genero, pr.persona_fisica proveedor_persona_fisica, pr.razon_social proveedor_razon_social, ' +
        ' pr.tipo_documento_id proveedor_tipo_doc_id, pr.documento proveedor_documento, pr.fecha_nacimiento proveedor_fecha_nac, pr.telefono proveedor_telefono, ' +
        " pr.email proveedor_email, ci.descripcion iva_descripcion, ci.tipo_factura iva_tipo_factura, ci.id iva_id, pr.calle proveedor_calle, pr.altura proveedor_altura, pr.piso proveedor_piso, pr.dpto proveedor_dpto,  date_format(pr.fecha_modificacion, '%d/%m/%Y %H:%i') proveedor_fecha_modificacion " +
        ' FROM proveedores pr, ' +
        ' condiciones_iva ci, ' +
        ' tipos_documento td, ' +
        ' localidades lo, ' +
        ' paises pa, ' +
        ' provincias pro, ' +
        ' usuarios us ' +
        ' where pr.eliminado = 0 ' +
        ' and pr.condicion_iva_id = ci.id ' +
        ' and pr.tipo_documento_id = td.id ' +
        ' and pr.pais_id = pa.id ' +
        ' and pr.provincia_id = pro.id ' +
        ' and pr.localidad_id = lo.id  ' +
        ' and pr.usuario_id = us.id ' +
        ' and (concat(pr.nombres, " ", pr.apellidos) like ? ' +
        ' or pr.razon_social like ? ' +
        ' or pr.documento like ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(selectProveedores, [fil, fil, fil], (err, result) => {
            if (!result) {
                
                resolve(err);
            } else {
                let ret = [];
                result.map(c => {
                    const { ...proveedores } = c;
                    ret.push(proveedores)
                });
                
                resolve(ret)
            }
        })
    });
    return promise;
}


async function buscarTipoDocumentos() {

    const selectTiposDocumentos = 'SELECT id, descripcion FROM tipos_documento ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTiposDocumentos, (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(b => {
                    const { ...proveedores } = b;
                    ret.push(proveedores);
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarLocalidades(filtro) {
    const fil = filtro ? '%' + filtro + '%' : '%';
    const selectLocalidades = 'SELECT lo.nombre nombre, lo.id id from localidades lo, provincias pr where lo.provincia_id = pr.id AND pr.id like ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectLocalidades, [fil], (err, result) => {
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

async function buscarProvincias(filtro) {
    
    const fil = filtro ? '%' + filtro + '%' : '%';
    const selectProvincias = 'SELECT pr.nombre provincia_nombre, pr.id provincia_id from provincias pr, paises pa where pr.pais_id = pa.id AND pa.id like ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectProvincias, [fil], (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(m => {
                    const { ...provincias } = m;
                    ret.push(provincias)
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarPaises(filtro) {
    
    const fil = filtro ? '%' + filtro + '%' : '%';
    const selectPaises = 'SELECT pa.nombre pais_nombre, pa.id pais_id from paises pa ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectPaises, [], (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(m => {
                    const { ...provincias } = m;
                    ret.push(provincias)
                });
                resolve(ret)
            }
        })
    });
    return promise;
}


async function verificarProveedorEliminado(body) {

    const documento = body.documento;
    const selectDocumentos = "SELECT prov.motivo_eliminado motivo_eliminado, us.nombre usuario_nombre, us.estado usuario_estado, us.email usuario_email, date_format(prov.fecha_modificacion, '%d/%m/%Y %H:%i') fecha_modificacion FROM proveedores prov, usuarios us where prov.documento = ? and prov.eliminado = 1 and prov.usuario_id = us.id";
    
    let promise = new Promise((resolve, reject) => {
        db.query(selectDocumentos,[ documento], (err, result) => {
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

async function eliminarProveedor(body) {
    //console.log("soy eliminarProveedor")
    console.log(body.id)
    const motivo_eliminado = body.motivo_eliminado;
    const usuario_id = body.usuario_id;
    const id = body.id;

    const elimProveedor = 'UPDATE proveedores SET eliminado = 1, motivo_eliminado = ?, usuario_id = ?, fecha_modificacion = sysdate()  WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(elimProveedor, [ motivo_eliminado, usuario_id, id], (err, result) => {
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


async function insertarProveedor(body) {
    console.log("soy insertarProveedor")
    console.log(body)
    const id = body.id;
    const nombres = body.nombre;
    const apellidos = body.apellido;
    const persona_fisica = body.persona_fisica;
    const condicion_iva_id = body.condicion_iva_id;
    const razon_social = body.razon_social;
    const tipo_documento_id = 1;
    const documento = body.documento;
    const fecha_nacimiento = "";
    const telefono = body.telefono;
    const email = body.email;
    const calle = body.calle;
    const altura = body.altura;
    const piso = body.piso;
    const dpto = body.dpto;
    const localidad_id = body.localidad;
    const pais_id = body.pais;
    const provincia_id = body.provincia;

    const insertProveedor = 'INSERT INTO proveedores (nro_proveedor, nombres, apellidos, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, telefono, email, calle, altura, piso, dpto, localidad_id, pais_id, provincia_id, eliminado, usuario_id, fecha_modificacion) VALUES ((select concat("P0", lpad((select COALESCE(max(ot.id), 0)+1 from proveedores ot), 8, "0"))),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0, ?,sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertProveedor, [nombres, apellidos, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, telefono, email, calle, altura, piso, dpto, localidad_id, pais_id, provincia_id, id], (err, result) => {
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

async function editarProveedor(body) {
    //console.log("soy el editar")
    //console.log(body)
    const id = body.id;
    const nombres = body.nombre;
    const apellidos = body.apellido;
    const persona_fisica = body.persona_fisica;
    const razon_social = body.razon_social;
    const tipo_documento_id = body.tipo_doc_id;
    const condicion_iva_id = body.condicion_iva_id;
    const documento = body.documento;
    const fecha_nacimiento = "";
    const telefono = body.telefono;
    const email = body.email;
    const calle = body.calle;
    const altura = body.altura;
    const piso = body.piso;
    const dpto = body.dpto;
    const localidad_id = body.localidad;
    const pais_id = body.pais;
    const provincia_id = body.provincia;


    const editProveedor = 'UPDATE proveedores SET nombres= ?, apellidos= ?, persona_fisica= ?, razon_social= ?, tipo_documento_id= ?, documento= ?, condicion_iva_id=?, telefono= ?, email= ?, calle= ?, altura= ?, piso= ?, dpto= ?, localidad_id= ?, pais_id =?, provincia_id =?, fecha_modificacion=sysdate()  WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(editProveedor, [nombres, apellidos, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, telefono, email, calle, altura, piso, dpto, localidad_id, pais_id, provincia_id, id], (err, result) => {
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