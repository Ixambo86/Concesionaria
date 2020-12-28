const db = require('../dbConection')

module.exports = {
    buscarAutomotores,
    insertarAutomotor,
    buscarVersiones,
    buscarCarrocerias,
    buscarTipoMotor,
    buscarTransmision,
    buscarColor,
    insertarVersionConfig,
    buscarModelos,
    eliminarAutomotor,
    buscarMarca,
    ObtenerVersionConfigId,
    editarAutomotor,
    InsertarNuevoColor,
    obtenerCatalogo,
    buscarSucursales,
    insertarVersion
};

async function InsertarNuevoColor(body) {
    console.log("Insertar Color")
    console.log("body",body)
    
    const nombre = body.id;

    
    const insertColor = 'INSERT INTO colores_automotor (descripcion, eliminado) VALUES (?,0)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertColor, [nombre], (err, result) => {
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

async function buscarAutomotores(filtro, cliente_id) {

    const fil = filtro ? '%' + filtro + '%' : '%';
    const client_id = cliente_id ? cliente_id : 0;
    const selectAutomotores = 'SELECT suc.id sucursal_id, suc.nombre sucursal, au.id, ma.descripcion marca, ma.id marca_id, moa.descripcion modelo, moa.id modelo_id, va.descripcion version, va.id version_id, ' +
                                'tm.descripcion tipo_motor, tm.id tipo_motor_id, au.anio, au.dominio, au.km, cla.descripcion color, cla.id color_id, au.precio, au.img, ' +
                                'plazo_entrega_0km, au.costo, au.nro_motor, au.nro_chasis, vc.id version_config_id, vc.origen origen, ' +
                                ' concat(ma.descripcion, " ", moa.descripcion, " ", va.descripcion) descripcion ' +
                                ' FROM automotores au ' +
                                ' LEFT JOIN sucursales suc ON au.sucursal_id = suc.id, ' +
                                ' versiones_configuracion vc, ' +                                
                                'versiones_automotor va, ' +
                                'tipos_motor tm, ' +
                                'colores_automotor cla, ' +
                                'marcas_automotor ma, ' +
                                'modelos_automotor moa ' +
                                'where au.version_config_id = vc.id ' +
                                "and au.eliminado = 0 " +
                                'and vc.tipo_motor_id = tm.id ' +
                                'and vc.color_id = cla.id ' +
                                'and vc.version_id = va.id ' +
                                'and va.modelo_id = moa.id ' +
                                'and moa.marca_id = ma.id ' +
                                'AND (au.dominio like ? ' +
                                'OR concat(ma.descripcion, " ", moa.descripcion, " ", va.descripcion) like ?) ' +
                                (cliente_id > 0 ? 'AND au.cliente_id = ?' : 'AND 0 = ?');
    let promise = new Promise((resolve, reject) => {
        db.query(selectAutomotores, [fil, fil, client_id], (err, result) => {
            if (!result) {
                //console.log("buscarAutomotores / err: ", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(a => {
                    const { ...automotores } = a;
                   
                    ret.push(automotores)
                });
                //console.log("buscarAutomotores / ret: ", ret)
                resolve(ret)
            }
        })
    });
    return promise;
}

async function ObtenerVersionConfigId(body) {
    console.log("ObtenerVersionConfigID")
    const version_id = body.version_id
    const tipo_motor_id = body.tipo_motor_id
    const color_id = body.color_id

    const getVersionId = 'select id from versiones_configuracion ' +
        'where version_id = ? ' +
        'and tipo_motor_id = ? ' +
        'and color_id = ? ';

    let promise = new Promise((resolve, reject) => {
        db.query(getVersionId, [version_id,
            tipo_motor_id,
            color_id],
            (err, result) => {
                if (err) {
                    console.log(err)
                    resolve(err);
                } else {
                    console.log(result)
                    resolve(result)
                }
            })
    });
    return promise;
}

async function insertarAutomotor(body) {
    console.log("insertarAutomotor");
    console.log(body);
    const version_config_id = body.version_config_id;
    const anio = body.automotor.anio;
    const nro_motor = body.automotor.nro_motor;
    const nro_chasis = body.automotor.nro_chasis;
    const dominio = body.automotor.dominio;
    const km = body.automotor.km;
    const sucursal = body.automotor.sucursal_id;
    const costo = body.automotor.costo;
    const precio = body.automotor.precio;
    const nuevo = body.automotor.nuevo;
    const img = body.automotor.img;
    const usuario = body.usuario;
 
    const insertAutomotor = 'INSERT INTO automotores ' +
        '(version_config_id, anio, nro_motor, nro_chasis, dominio, km, sucursal_id, costo, precio, nuevo, img, eliminado, usuario_id, fecha_modificacion) ' +
        'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertAutomotor, [
            version_config_id,
            anio,
            nro_motor,
            nro_chasis,
            dominio,
            km,
            sucursal,
            costo,
            precio,
            nuevo,
            img,
            usuario
        ],
            (err, result) => {
                if (err) {
                    console.log(err)
                    resolve(err);
                } else {
                    console.log(result)
                    resolve(result)
                }
            })
    });
    return promise;
}

async function insertarVersion(body) {
    console.log("insertarVersion")
    console.log(body)
    const usuario_id = body.id;
    const descripcion = body.version;
    const modelo_id = body.modelo;

    const insertAutomotor = 'INSERT INTO versiones_automotor ' +
        '(modelo_id, descripcion, eliminado, usuario_id, fecha_modificacion) ' +
        'VALUES(?, ?, 0, ?, sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertAutomotor, [
            modelo_id,
            descripcion,
            usuario_id],
            (err, result) => {
                if (err) {
                    console.log(err)
                    resolve(err);
                } else {
                    console.log(result)
                    resolve(result)
                }
            })
    });
    return promise;
}


async function editarAutomotor(body) {

    const anio = body.automotor.anio;
    const nro_motor = body.automotor.nro_motor;
    const nro_chasis = body.automotor.nro_chasis;
    const dominio = body.automotor.dominio;
    const km = body.automotor.km;
    const costo = body.automotor.costo;
    const precio = body.automotor.precio;
    const id = body.automotor.id;
    const version_config_id = body.version_config_id;
    const sucursal_id = body.automotor.sucursal_id;
    const nuevo = body.automotor.nuevo;
    const img = body.automotor.img;

    const editAutomotor = 'UPDATE automotores SET ' +
        'version_config_id = ?,' +
        'anio = ?,' +
        'nro_motor = ?, ' +
        'nro_chasis = ?, ' +
        'dominio = ?, ' +
        'km = ?, ' +
        'costo = ?, ' +
        'sucursal_id = ?, ' +
        'nuevo = ?, ' +
        'img = ?, ' +
        'precio = ? ' +
        'WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(editAutomotor, [version_config_id,
            anio,
            nro_motor,
            nro_chasis,
            dominio,
            km,
            costo,
            sucursal_id,
            nuevo,
            img,
            precio,
            id],
            (err, result) => {
                if (err) {

                  
                    resolve(err);
                } else {
                
                    resolve(result)
                }
            })
    });
    return promise;
}

/*****************************************************************************************/

async function buscarVersiones(filtro) {
    const fil = filtro;
    const selectVersiones = 'SELECT id, descripcion ' +
        'FROM versiones_automotor ' +
        'WHERE eliminado = 0 ' +
        'AND modelo_id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectVersiones, [fil], (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(v => {
                    const { ...versiones } = v;
                    ret.push(versiones)
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarCarrocerias() {

    const selectCarroceria = 'SELECT id, descripcion ' +
        'FROM carrocerias_automotor ' +
        'WHERE eliminado = 0 ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectCarroceria, (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(c => {
                    const { ...carrocerias } = c;
                    ret.push(carrocerias)
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarTipoMotor() {
    const selectMotor = 'SELECT id, descripcion FROM tipos_motor WHERE eliminado = 0 ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectMotor, (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(m => {
                    const { ...motores } = m;
                    ret.push(motores)
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarSucursales() {
    const selectSucursales = 'SELECT id, nombre FROM sucursales WHERE eliminado = 0 ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectSucursales, (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(m => {
                    const { ...motores } = m;
                    ret.push(motores)
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarTransmision() {
    const selectTransmicion = 'SELECT id, descripcion FROM tipos_transmision WHERE eliminado = 0';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTransmicion, (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(t => {
                    const { ...transmicion } = t;
                    ret.push(transmicion)
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarColor() {
    const selectColores = 'SELECT id, descripcion FROM colores_automotor WHERE eliminado = 0';
    let promise = new Promise((resolve, reject) => {
        db.query(selectColores, (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(c => {
                    const { ...colores } = c;
                    ret.push(colores)
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function insertarVersionConfig(body) {
    console.log(insertarVersionConfig)
    

    const version_id = body.automotor.version_id;
    const tipo_motor_id = body.automotor.tipo_motor_id;
    const color_id = body.automotor.color_id;
    const costo = body.automotor.costo
    const precio = body.automotor.precio
    const plazo_entrega_0km = body.automotor.plazo_entrega_0km
    const img = body.automotor.img
    const usuario_id = body.usuario
    const origen = body.automotor.origen

    const insertVersion = 'INSERT INTO versiones_configuracion ' +
        '(version_id, tipo_motor_id, color_id, costo, precio, plazo_entrega_0km, img, eliminado, usuario_id, fecha_modificacion, origen) ' +
        'VALUES(?, ?, ?, ?, ?, ?, ?, 0, ?, sysdate(), ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertVersion, [version_id,
            tipo_motor_id,
            color_id,
            costo,
            precio,
            plazo_entrega_0km,
            img,
            usuario_id, 
            origen],
            (err, result) => {
                if (err) {
                    console.log(err)
                    resolve(err);
                } else {
                    console.log(result)
                    resolve(result)
                }
            })
    });
    return promise;
}

/**********************************************************************************************/

async function buscarModelos(filtro) {
    const fil = filtro;
    const selectColores = 'SELECT id, descripcion FROM modelos_automotor WHERE eliminado = 0 AND marca_id = ?';
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

// esta funcion no esta bien
async function eliminarAutomotor(body) {

    const id = body.id;

    const deleteAutomotor = 'UPDATE automotores SET eliminado = 1 WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(deleteAutomotor, [id], (err, result) => {
            if (err) {
                
                resolve(err);
            } else {
                ////console.log("result", result)
                resolve(result)
            }
        })
    });

    return promise;
}


async function buscarMarca(filtro) {
    const fil = filtro ? '%' + filtro + '%' : '%';
    const selectMarcas = 'SELECT id, descripcion FROM marcas_automotor WHERE eliminado = 0 AND descripcion like ?';
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

async function obtenerCatalogo(body) {
   
    const fil = body.filtro.buscar ? '%' + body.filtro.buscar + '%' : '%';
    const motor = body.filtro.motor ? '%' + body.filtro.motor + '%' : '%'
    const precio_desde = body.filtro.precio_desde  ? '%' + body.filtro.precio_desde + '%' : '%';
    const precio_hasta = body.filtro.precio_hasta  ? body.filtro.precio_hasta : 999999999;
    const anio_desde = body.filtro.anio_desde  ? body.filtro.anio_desde : 0;
    const anio_hasta = body.filtro.anio_hasta  ? body.filtro.anio_hasta : 999999999;
    const km_desde = body.filtro.km_desde  ? body.filtro.km_desde : 0;
    const km_hasta = body.filtro.km_hasta  ? body.filtro.km_hasta : 999999999;
    const selectAutomotores =   "select * from " +
                                "(select ma.descripcion marca, mo.descripcion modelo, va.descripcion version, ca.descripcion color, tm.descripcion motor, vc.id version_config_id, " +
                                " coalesce(au.precio, vc.precio) precio, coalesce(au.costo, vc.costo) costo, coalesce(au.img, vc.img) img, vc.plazo_entrega_0km, vc.origen, " +
                                " coalesce(au.anio, DATE_FORMAT(sysdate() + interval 1 month, '%Y')) anio, coalesce(au.km, 0) km, coalesce(au.dominio, 'SIN ESPECIFICAR') dominio, " + 
                                " coalesce(au.nro_chasis, 'SIN ESPECIFICAR') nro_chasis, coalesce(au.nro_motor, 'SIN ESPECIFICAR') nro_motor, coalesce(su.nombre, 'SIN ESPECIFICAR') sucursal, " + 
                                " concat(ma.descripcion, ' ', mo.descripcion, ' ', va.descripcion) descripcion " +
                                "from	marcas_automotor ma, modelos_automotor mo, versiones_automotor va, colores_automotor ca, tipos_motor tm, versiones_configuracion vc " +
                                "left join automotores au on vc.id = au.version_config_id " +
                                "left join sucursales su on au.sucursal_id = su.id " +
                                "where	ma.id = mo.marca_id " +
                                "and 	mo.id = va.modelo_id " +
                                "and	va.id = vc.version_id " +
                                "and 	vc.color_id = ca.id " +
                                "and 	vc.tipo_motor_id = tm.id " + 
                                "and    au.cliente_id is null) a " +
                                "where 	motor like ? " +
                                "and 	precio between ? and ? " +
                                "and 	anio between ? and ? " +
                                "and 	km between ? and ? " +
                                "and    descripcion like ? " +
                                "order by descripcion";
    let promise = new Promise((resolve, reject) => {
        db.query(selectAutomotores, [motor, precio_desde, precio_hasta, anio_desde, anio_hasta, km_desde, km_hasta, fil], (err, result) => {
            if (!result) {
                console.log("obtenerCatalogo / err: ", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(a => {
                    const { ...automotores } = a;
                   
                    ret.push(automotores)
                });
               // console.log("obtenerCatalogo / ret: ", ret)
                resolve(ret)
            }
        })
    });
    return promise;
}