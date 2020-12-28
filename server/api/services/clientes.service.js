const db = require('../dbConection')
const cron = require('node-cron');
const sendEmail = require('../mailSender');

module.exports = {
    buscarClientes,
    buscarCliente,
    insertarCliente,
    editarCliente,
    eliminarCliente,
    verificarClienteEliminado,
    buscarLocalidades,
    buscarPaises,
    buscarProvincias,
    buscarIvas
};

async function buscarClientes(filtro) {
    const fil = filtro ? '%' + filtro + '%':'%';
    const selectClientes = 'SELECT cl.*, ci.descripcion condicion_iva, ci.tipo_factura, ' +
                            ' concat(cl.calle, " ", cl.altura, " ", cl.piso, cl.dpto, ", ", lo.nombre, ", ", pr.nombre, ", ", pa.nombre) domicilio ' + 
                            'FROM clientes cl, condiciones_iva ci, localidades lo, provincias pr, paises pa ' + 
                            'WHERE cl.condicion_iva_id = ci.id ' + 
                            'and cl.localidad_id = lo.id ' +
                            'and lo.provincia_id = pr.id ' +
                            'and pr.pais_id = pa.id ' +
                            ' and (concat(nombres, " ", apellidos) like ? ' +
                            'OR razon_social like ? ' + 
                            'OR documento like ?)';
    let promise = new Promise((resolve, reject) => {
        db.query(selectClientes, [fil, fil, fil], (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(c => {
                    const {...clientes} = c;
                    ret.push(clientes)
                });
                resolve(ret)
            }
        })
    });
    return promise;    
}

async function buscarCliente(body) {
    const buscar = body.filtro.buscar ? '%' + body.filtro.buscar + '%':'%';
    const nombre = body.filtro.nombre  ? '%' + body.filtro.nombre + '%':'%';
    const razon = body.filtro.razon ? '%' + body.filtro.razon + '%':'%';
    const nro = body.filtro.nro ? '%' + body.filtro.nro + '%':'%';
    const documento = body.filtro.documento  ? '%' + body.filtro.documento + '%':'%';
    const genero = body.filtro.genero  ? '%' + body.filtro.genero + '%':'%';
    const fecha_nac = body.filtro.fecha_nac ? '%' + body.filtro.fecha_nac + '%':'%'; 
    const selectCliente = "SELECT us.id usuario_id, us.nombre usuario_nombre,pa.id pais_id, pa.nombre pais_nombre, pr.id provincia_id, pr.nombre provincia_nombre, lo.id loc_id, lo.nombre loc_nombre, td.id tipo_documento_id, td.descripcion tipo_documento_descripcion, " +
        " cl.id cliente_id, cl.nro_cliente cliente_nro, cl.nombres cliente_nombre, cl.apellidos cliente_apellido, " +
        " cl.genero cliente_genero, cl.persona_fisica cliente_persona_fisica, cl.razon_social cliente_razon_social, " +
        " cl.tipo_documento_id cliente_tipo_doc_id, cl.documento cliente_documento, cl.fecha_nacimiento cliente_fecha_nac, cl.telefono cliente_telefono, " +
        " cl.email cliente_email, ci.id ci_id, ci.descripcion ci_descripcion, ci.tipo_factura ci_tipo_factura, cl.calle cliente_calle, cl.altura cliente_altura, cl.piso cliente_piso, cl.dpto cliente_dpto, date_format(cl.fecha_modificacion, '%d/%m/%Y %H:%i') cliente_fecha_modificacion " +
        " FROM clientes cl, condiciones_iva ci, tipos_documento td, paises pa, provincias pr, localidades lo, usuarios us " +
        " WHERE cl.eliminado = 0 and cl.condicion_iva_id = ci.id and cl.tipo_documento_id = td.id and cl.pais_id = pa.id and cl.provincia_id = pr.id and cl.localidad_id = lo.id  " +
        ' and cl.usuario_id = us.id ' +
        " and concat(cl.nombres, ' ', cl.apellidos) like ? and cl.razon_social like ? and cl.nro_cliente like ? and cl.documento like ? " +
        " and cl.genero like ? and cl.fecha_nacimiento like ? " +
        " ORDER BY cl.nro_cliente ";
    let promise = new Promise((resolve, reject) => {
        db.query(selectCliente, [nombre, razon, nro, documento, genero, fecha_nac, buscar], (err, result) => {
            if (!result) {               
                resolve(err);
            } else {
                let ret = [];
                result.map(c => {
                    const { ...clientes } = c;
                    ret.push(clientes)
                });                
                resolve(ret)
            }
        })
    });
    return promise;
}

async function insertarCliente(body) {
    const id = body.id;
    const nombres = body.nombre;
    const apellidos = body.apellido;
    const cli_genero = body.genero; 
    const persona_fisica = body.persona_fisica;
    const cli_id = body.ci_id;
    const razon_social = body.razon_social;
    const tipo_documento_id = 1;
    const documento = body.documento;
    const fecha_nacimiento = body.fecha_nac;
    const telefono = body.telefono;
    const email = body.email;
    const calle = body.calle;
    const altura = body.altura;
    const piso = body.piso;
    const dpto = body.dpto;
    const pais_id = body.pais;
    const provincia_id = body.prov;
    const localidad_id = body.localidad;
    const insertCliente = 'INSERT INTO clientes (nro_cliente, nombres, apellidos, genero, fecha_nacimiento, persona_fisica, razon_social, tipo_documento_id, documento, condicion_iva_id, telefono, email, calle, altura, piso, dpto, pais_id, provincia_id, localidad_id, usuario_id, fecha_modificacion) VALUES ((select concat("C0", lpad((select COALESCE(max(cl.id), 0)+1 from clientes cl), 8, "0"))),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,sysdate())';
    let promise = new Promise((resolve, reject) => {
        db.query(insertCliente, [nombres, apellidos, cli_genero, fecha_nacimiento, persona_fisica, razon_social, tipo_documento_id, documento, cli_id, telefono, email, calle, altura, piso, dpto, pais_id,provincia_id, localidad_id, id], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                const selectCostumer = "SELECT * FROM costumer WHERE id = 2";
                db.query(selectCostumer, (err, result) => {
                    if (!result) {
                        resolve(err);
                    } else {
                        const asunto = result[0].asunto;
                        const titulo = result[0].titulo;
                        const mensaje = result[0].mensaje;
                    sendEmail({from: 'concesionaria.autobot.2020@gmail.com', to: email,
                    subject: asunto, html: '<h2>' + titulo +'</h2> <p>' + mensaje +'</p>'});
                    }
                })
                resolve()
            }
        
        });

    });
    return promise;
    }    

async function editarCliente(body) {
    const id = body.id;
    const nombres = body.nombre;
    const apellidos = body.apellido;
    const cli_genero = body.genero; 
    const persona_fisica = body.persona_fisica;
    const ci_id = body.ci_id;
    const razon_social = body.razon_social;
    const tipo_documento_id = 1;
    const documento = body.documento;
    const fecha_nacimiento = body.fecha_nac;
    const telefono = body.telefono;
    const email = body.email;
    const calle = body.calle;
    const altura = body.altura;
    const piso = body.piso;
    const dpto = body.dpto;
    const pais_id = body.pais;
    const provincia_id = body.prov;
    const localidad_id = body.localidad;
    const editCliente = 'UPDATE clientes SET eliminado = 0, nombres= ?, apellidos= ?, genero= ?, fecha_nacimiento= ?,persona_fisica= ?, razon_social= ?, tipo_documento_id= ?, documento= ?, condicion_iva_id= ?, telefono= ?, email= ?, calle= ?, altura= ?, piso= ?, dpto= ?, localidad_id= ?, pais_id= ?, provincia_id= ?, fecha_modificacion= sysdate()  WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(editCliente, [nombres, apellidos, cli_genero, fecha_nacimiento, persona_fisica, razon_social, tipo_documento_id, documento, ci_id, telefono, email, calle, altura, piso, dpto, localidad_id, pais_id, provincia_id,  id], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                resolve(result)
            }
        })
    });
    return promise;
}

async function eliminarCliente(body) {
    const motivo_eliminado = body.motivo_eliminado;
    const usuario_id = body.usuario_id;
    const id = body.id;

    const eliminarCli = 'UPDATE clientes SET eliminado = 1, motivo_eliminado = ?, usuario_id = ?, fecha_modificacion = sysdate()  WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(eliminarCli, [ motivo_eliminado, usuario_id, id], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                resolve(result)
            }
        })
    });
    return promise;
}

async function verificarClienteEliminado(body) {
    const documento = body.documento;
    const selectEliminados = "SELECT cl.id cl_id, cl.motivo_eliminado motivo_eliminado, us.nombre usuario_nombre, us.estado usuario_estado, us.email usuario_email, date_format(cl.fecha_modificacion, '%d/%m/%Y %H:%i') fecha_modificacion FROM clientes cl, usuarios us WHERE cl.documento = ? and cl.eliminado = 1 and cl.usuario_id = us.id";
    let promise = new Promise((resolve, reject) => {
        db.query(selectEliminados,[ documento], (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(a => {
                    const { ...clientes } = a;
                    ret.push(clientes);
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarPaises() {
    const selectPaises = 'SELECT p.id pais_id, p.nombre pais_nombre FROM paises p ORDER BY p.nombre ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectPaises, (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(a => {
                    const { ...pais } = a;
                    ret.push(pais);
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarProvincias(body) {
    const pais = body.pais;
    const selectProvincias = 'SELECT p.id provincia_id, p.nombre provincia_nombre FROM provincias p WHERE p.pais_id = ? ORDER BY p.nombre ';
    let promise = new Promise((resolve, reject) => {
        db.query(selectProvincias,[pais], (err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(a => {
                    const { ...provincias } = a;
                    ret.push(provincias);
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarLocalidades(body) {
    const prov = body.provincia;
    const selectLocalidades = 'SELECT l.id loc_id, l.nombre loc_nombre FROM localidades l WHERE l.provincia_id = ? ORDER BY l.nombre';
    let promise = new Promise((resolve, reject) => {
        db.query(selectLocalidades, [prov],(err, result) => {
            if (!result) {
                resolve(err);
            } else {
                let ret = [];
                result.map(a => {
                    const { ...localidad } = a;
                    ret.push(localidad);
                });
                resolve(ret)
            }
        })
    });
    return promise;
}

async function buscarIvas() {
    const selectbuscarIvas = 'SELECT ci.id ci_id, ci.descripcion ci_descripcion, ci.tipo_factura ci_tipo_factura FROM condiciones_iva ci ';
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

async function buscarCostumers() {
    const selectCostumer = "SELECT * FROM costumer WHERE id = 1";
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

async function enviarCumpleaños() {
    const autoAusencia = "SELECT email FROM clientes WHERE DATE_FORMAT(fecha_nacimiento, '%m-%d') = DATE_FORMAT(sysdate(), '%m-%d') AND eliminado = 0";
    let promise = new Promise((resolve, reject) => {
        db.query(autoAusencia, (err, result) => {           
            if (!result) {
                resolve(err);
            } else {
                for (var i=0; i < result.length; i ++){
                    const mail = result[i].email;
                    const selectCostumer = "SELECT * FROM costumer WHERE id = 1";

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

cron.schedule('0 9 * * *', () => {
    enviarCumpleaños();
});