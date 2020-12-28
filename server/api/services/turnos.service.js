const db = require('../dbConection');
const cron = require('node-cron');
const sendEmail = require('../mailSender');
const config = require('config.json');

module.exports = {
    buscarTurnos,
    insertarTurno,
    cancelarTurno,
    eliminarTurno,
    buscarSucursales,
    buscarOrdenes,
};

async function buscarTurnos(fecha, sucursal) {
    const fech = fecha;
    const sucur = sucursal;
    const selectTurnos = 'SELECT * FROM turnos WHERE eliminado = 0 AND fecha = ? AND sucursal_id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTurnos, [fech, sucur], (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(t => {
                    const {...turnos} = t;
                    ret.push(turnos)
                });
                resolve(ret)
            }
        })
    });
    return promise;    
}

async function insertarTurno(fech, mod, sucur, ord, num, cantMod, mec, cli) {
    //console.log("insertar turno", fech, mod, sucur, ord, num, cantMod, mec);
    const fecha = fech;
    const modulo = mod;
    const sucursal = sucur;
    const orden_trabajo_id = ord;
    const nro_orden = num;
    const cantidad_modulos = cantMod;
    const mecanico = mec;
    const cliente_id = cli
    const insertTurno = 'INSERT INTO turnos(fecha_hora, fecha, modulo, sucursal_id, orden_trabajo_id, nro_orden, cantidad_modulos, mecanico, cliente_id) VALUES(sysdate(), ?, ?, ?, ?, ?, ?, ?, ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(insertTurno, [fecha, modulo, sucursal, orden_trabajo_id, nro_orden, cantidad_modulos, mecanico, cliente_id], (err, result) => {
            if (err) {
                //console.log(err);
                reject(err);
            } else {
                const updateOrden = 'UPDATE ordenes_trabajo SET estado = "PENDIENTE" WHERE id = (SELECT orden_trabajo_id FROM turnos WHERE id =?)'
                db.query(updateOrden, [result.insertId], (err, result) => {
                    if (err) {
                        //console.log(err);
                    } else {
                        //console.log(result)
                    }
                })
                resolve()
            }
        });
    })
    return promise;
}

async function cancelarTurno(fech, mod, sucur, num, mec) {
    const fecha = fech;
    const modulo = mod;
    const sucursal = sucur;
    const numOrden = num;
    const mecanico = mec;
    const cancelTurno = 'UPDATE turnos SET eliminado = 1 WHERE fecha = ? AND modulo = ? AND sucursal_id = ? AND nro_orden = ? AND mecanico =?';
    let promise = new Promise((resolve, reject) => {
        db.query(cancelTurno, [fecha, modulo, sucursal, numOrden, mecanico], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                const cancelOrden = 'UPDATE ordenes_trabajo SET estado = "INICIADA" WHERE id = (SELECT orden_trabajo_id FROM turnos WHERE eliminado = 1 AND fecha = ? AND modulo = ? AND sucursal_id = ? AND nro_orden = ? AND mecanico =?)'
                db.query(cancelOrden, [fecha, modulo, sucursal, numOrden, mecanico], (err, result) => {
                    if (err) {
                        //console.log(err);
                    } else {
                        //console.log(result)
                    }
                }) 
                resolve()
            }
        });
    })
    return promise;
}

async function eliminarTurno(fech, mod, sucur, num, mec) {
    const fecha = fech;
    const modulo = mod;
    const sucursal = sucur;
    const numOrden = num;
    const mecanico = mec;
    const eliminarTurno = 'UPDATE turnos SET eliminado = 1 WHERE fecha = ? AND modulo = ? AND sucursal_id = ? AND nro_orden = ? AND mecanico =?';
    let promise = new Promise((resolve, reject) => {
        db.query(eliminarTurno, [fecha, modulo, sucursal, numOrden, mecanico], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                const eliminarOrden = 'UPDATE ordenes_trabajo SET estado = "CANCELADA" WHERE id = (SELECT orden_trabajo_id FROM turnos WHERE eliminado = 1 AND fecha = ? AND modulo = ? AND sucursal_id = ? AND nro_orden = ? AND mecanico =?)'
                db.query(eliminarOrden, [fecha, modulo, sucursal, numOrden, mecanico], (err, result) => {
                    if (err) {
                        //console.log(err);
                    } else {
                        //console.log(result)
                    }
                }) 
                resolve()
            }
        });
    })
    return promise;
}

async function buscarSucursales() {
    const selectSucursales = 'SELECT * FROM sucursales';
    let promise = new Promise((resolve, reject) => {
        db.query(selectSucursales, (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(s => {
                    const {...sucursal } = s;
                    ret.push(sucursal)
                });
                resolve(ret)
            }
        })
    });
    return promise;    
}


async function buscarOrdenes(body) {
    console.log("buscarOrdenes / body: ", body)
    const buscar = body.filtro.buscar ? '%' + body.filtro.buscar + '%':'%';
    const cliente_nombre = body.filtro.cliente_nombre  ? '%' + body.filtro.cliente_nombre + '%':'%';
    const nro_orden = body.filtro.nro_orden ? '%' + body.filtro.nro_orden + '%':'%';
    const estado = body.filtro.estado  ? '%' + body.filtro.estado + '%':'%';
    const automotor_descripcion = body.filtro.automotor_descripcion  ? '%' + body.filtro.automotor_descripcion + '%':'%';
    const sucursal = body.filtro.sucursal  ? '%' + body.filtro.sucursal + '%':'%';
    const fecha_desde = body.filtro.fecha_desde  ? body.filtro.fecha_desde + ' 00:00:00': '1900-01-01';
    const fecha_hasta = body.filtro.fecha_hasta  ? body.filtro.fecha_hasta + ' 23:59:59': '2100-12-31';

    const id = body.orden_id ? body.orden_id: 0;
    const selectOrdenes = "select ot.id, ot.nro_orden, ot.cantidad_modulos," +
                        "cl.id cliente_id, cl.nro_cliente cliente_nro, concat(cl.nombres, ' ', cl.apellidos) cliente_nombre," +
                        "cl.razon_social cliente_razon_social, " +
                        "cl.documento cliente_documento,"+ 
                        "au.id automotor_id, au.dominio automotor_dominio, au.km automotor_km, tm.descripcion automotor_motor, ot.usuario_id, us.nombre usuario, su.nombre sucursal, "+
                        "mo.id modelo_id, concat(ma.descripcion, ' ', mo.descripcion, ' ', va.descripcion, ' ', au.anio) automotor_descripcion " +
                        "from ordenes_trabajo ot " + 
                        "left join usuarios us on ot.usuario_id = us.id "+
                        "left join sucursales su on us.sucursal_id = su.id "+
                        ",clientes cl, " +
                        "condiciones_iva ci, " +
                        "automotores au, " +
                        "versiones_configuracion vc, " +
                        "tipos_motor tm, " +
                        "versiones_automotor va, " +
                        "marcas_automotor ma, " + 
                        "modelos_automotor mo " + 
                        "where ot.eliminado = 0 AND ot.estado = 'INICIADA'" + 
                        "and ot.cliente_id = cl.id " +
                        "and cl.condicion_iva_id = ci.id " +
                        "and ot.automotor_id = au.id " +
                        "and au.version_config_id = vc.id " + 
                        "and vc.version_id = va.id " +
                        "and vc.tipo_motor_id = tm.id " +
                        "and va.modelo_id = mo.id " +  
                        "and mo.marca_id = ma.id " + 
                        "and (concat(cl.nombres, ' ', cl.apellidos) like ? or cl.razon_social like ?) " +
                        "and ot.nro_orden like ? " +
                        "and ot.estado like ? " +
                        "and concat(ma.descripcion, ' ', mo.descripcion, ' ', va.descripcion) like ? " +
                        "and su.nombre like ? " +
                        "and ot.fecha_hora between ? and ? " +
                        "and (au.dominio like ? " +
                        " or cl.documento like ?) " +
                        (id === 0 ? "and 0 = ? ":" and ot.id = ? ") + 
                        "ORDER BY ot.fecha_hora";
    let promise = new Promise((resolve, reject) => {
        db.query(selectOrdenes, [cliente_nombre, cliente_nombre, nro_orden, estado, automotor_descripcion, sucursal, fecha_desde, fecha_hasta, buscar, buscar, id], (err, result) => {
            if (!result) {
                console.log("buscarOrdenes / err: ", err)
                resolve(err);
            } else {
                let ret = [];
                result.map(ot => {
                    const {...ordenes} = ot;
                    ret.push(ordenes)
                });
               console.log("buscarOrdenes / ret: ", ret)
                resolve(ret)
            }
        })
    }); 
    return promise;
}

hourToMod = ()=> {
    const hoy = new Date();
    const local = hoy.toTimeString().slice(0,5);
    const hora = hoy.toTimeString().slice(0,2);
    const min = hoy.toTimeString().slice(3,5);
    var mod = (parseInt(hora) -8) * 2;
    if (parseInt(min) >29)
        mod++;

    return mod;
}

async function autoInOrden() {
    const mod = hourToMod();
    const autoIn = 'SELECT orden_trabajo_id, modulo, cantidad_modulos FROM turnos WHERE fecha = DATE(sysdate()) AND modulo = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(autoIn, [mod], (err, result) => {           
            if (!result) {
                resolve(err);
            } else {
                for (var i=0; i < result.length; i ++){
                    const term = result[i].cantidad_modulos + result[i].modulo;
                    const ot = result[i].orden_trabajo_id;
                    const iniciarOrden = 'UPDATE ordenes_trabajo SET estado = "EN PROCESO" WHERE id = ?'
                    db.query(iniciarOrden, [ot], (err, result) => {
                        if (err) {
                            //console.log(err);
                        } else {
                            //console.log(result)
                        }       
                    }) 
                    resolve()
                }
            }
        });
    
    });
    return promise;
}    

async function autoFinOrden() {
    const autoFin = 'SELECT orden_trabajo_id, modulo, cantidad_modulos FROM turnos WHERE fecha = DATE(sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(autoFin, (err, result) => {           
            if (!result) {
                resolve(err);
            } else {
                for (var i=0; i < result.length; i ++){
                    const term = result[i].cantidad_modulos + result[i].modulo; 
                    const ot = result[i].orden_trabajo_id;
                    const mod = hourToMod()
                    if (mod === term) {
                        const terminarOrden = 'UPDATE ordenes_trabajo SET estado = "FINALIZADA" WHERE id = ? AND estado = "EN PROCESO"'
                        db.query(terminarOrden, [ot], (err, result) => {
                            if (err) {
                                //console.log(err);
                            } else {
                                //console.log(result)
                            }       
                        }) 
                        resolve()
                    }
                }
            }
        });
    
    });
    return promise;
}

async function autoAusencia() {
    const autoAusencia = 'SELECT orden_trabajo_id FROM turnos WHERE fecha = DATE(sysdate())';;
    let promise = new Promise((resolve, reject) => {
        db.query(autoAusencia, (err, result) => {           
            if (!result) {
                resolve(err);
            } else {
                for (var i=0; i < result.length; i ++){
                    const ot = result[i].orden_trabajo_id;
                    const ausenteOrden = 'UPDATE ordenes_trabajo SET estado = "AUSENTE" WHERE id = ? AND estado = "FINALIZADA"'
                    db.query(ausenteOrden, [ot], (err, result) => {
                        if (err) {
                            //console.log(err);
                        } else {
                            //console.log(result)
                        }       
                    }) 
                    resolve()
                }
            }
        });
    
    });
    return promise;
}  

async function autoAviso() {
    const autoAviso = 'SELECT email FROM clientes WHERE id= (SELECT cliente_id FROM turnos WHERE fecha = DATE(sysdate())+INTERVAL 1 DAY)';
    let promise = new Promise((resolve, reject) => {
        db.query(autoAviso, (err, result) => {           
            if (!result) {
                resolve(err);
            } else {
                for (var i=0; i < result.length; i ++){
                    const mail = result[i].email;
                    const selectCostumer = "SELECT * FROM costumer WHERE id = 3";
                    db.query(selectCostumer, (err, result) => {
                        if (!result) {
                            resolve(err);
                        } else {
                            const asunto = result[0].asunto;
                            const titulo = result[0].titulo;
                            const mensaje = result[0].mensaje;
                        sendEmail({from: 'concesionaria.autobot.2020@gmail.com', to: mail,
                        subject: asunto, html: '<h2>' + titulo +'</h2> <p>' + mensaje +'</p>'});
                        }
                    })
                    resolve()
                }
            }
        });
    
    });
    return promise;
}   

async function envioEncuesta() {
    const autoEnvio = "SELECT email FROM clientes WHERE id = (SELECT cliente_id FROM ordenes_trabajo WHERE DATE(fecha_hora) = DATE(sysdate()) AND estado = 'FACTURADA')";
    let promise = new Promise((resolve, reject) => {
        db.query(autoEnvio, (err, result) => {           
            if (!result) {
                resolve(err);
            } else {
                for (var i=0; i < result.length; i ++){
                    const mail = result[i].email;
                        sendEmail({from: 'concesionaria.autobot.2020@gmail.com', to: mail,
                        subject: 'Encuesta de satisfacción Autobot', html: '<a href="' + config.urlClient + '/encuesta"> Hacer click para contestar encuesta.</a>'});
                        
                }
            }
        });
    });
    return promise;
}    

cron.schedule('0,30 8-19 * * *', () => {
    autoInOrden();
    autoFinOrden()
});

cron.schedule('5 19 * * *', () => {
    autoAusencia();
    envioEncuesta();
});

cron.schedule('0 9 * * *', () => {
    autoAviso();
});



