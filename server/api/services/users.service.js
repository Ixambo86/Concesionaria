const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../dbConection');

/*
let roles = [];
const selectRoles = 'SELECT descripcion FROM roles'
db.query(selectRoles, (err, result) => {
    result.forEach(e => {
        roles.push(e.descripcion);
    })
});
*/

module.exports = {
    //roles,
    authenticate,
    getAll,
    getById,
    altaUsuario,
    actualizarUsuario,
    borrarUsuario,
    getRoles,
    setRolesUsuario,
    deleteRolesUsuario,
    getRolesUsuario,
    recuperarPass,
    validarToken,
    resetPass,
    buscarTotalUsuarios,
    buscarUsuariosActivos,
    buscarUsuariosEliminados,
    buscarUsuariosBloqueados,
    buscarUsuariosAdministradores,
    buscarUsuariosMecanicos,
    buscarUsuariosVendedores,
    buscarUsuariosAdministrativos,
    buscarUsuariosSupervisores,
    buscarUsuariosGerentes,
    
    buscarCantidadVentas,
    buscarCantidadReservas,
    buscarVentasFinalizadas,
    buscarVentasCanceladas,
    buscarUltimaVenta,
    buscarVentasIniciadas,

    buscarVentaPromedio,
    buscarIngresosTotales,
    buscarEgresosTotales,
    buscarVentasVendedor,

    buscarOrdenesTotales,
    buscarOrdenesFinalizadas,
    buscarOrdenesCanceladas,
    buscarUltimaOrden,
    buscarOrdenesIniciadas,
    buscarOrdenesPendientes,
    buscarOrdenesFacturadas

};

async function authenticate({ username, password }) {
    const selectUser = 'SELECT * FROM usuarios u WHERE u.usuario = ? AND u.estado = "Activo"'
    const selectRoles = 'SELECT r.descripcion FROM roles r, usuarios_roles ur, usuarios u WHERE ur.usuario_id = u.id AND ur.rol_id = r.id AND u.id = ?'
    let promise = new Promise((resolve, reject) => {
        db.query(selectUser, [username], async (err, result) => {
            if (err) {
                resolve(err)
            } else if (result.length > 0 && result[0].password_hash != null && await bcrypt.compare(password, result[0].password_hash)) {
                db.query(selectRoles, [result[0].id], (err, result2) => {
                    if (err) {
                        resolve(err)
                    } else {
                        let roles_usuario = [];
                        result2.forEach(element => {
                            roles_usuario.push(element.descripcion);
                        });
                        let user = {id: result[0].id, user: username, nombre: result[0].nombre, sucursal: result[0].sucursal_id, bonificacion_maxima: result[0].bonificacion_maxima, role: roles_usuario};
                        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
                        const { password_hash, ...userWithoutPassword } = user;
                        resolve({
                            ...userWithoutPassword,
                            token
                        });
                    }
                });   
            } else {
                resolve(undefined);
            }
        });
    });
    return promise;
}

async function getAll(body) {
    const filtro = body.filtro ? '%' + body.filtro + '%':'%';
    const selectAllUsers = 'SELECT u.*, u.id as legajo, s.nombre AS sucursal FROM usuarios u, sucursales s WHERE (u.id like ? OR u.dni like ? OR u.usuario like ? OR u.nombre like ? OR u.email like ? OR u.estado like ?) and u.sucursal_id = s.id';
    let promise = new Promise((resolve, reject) => {
        db.query(selectAllUsers, [filtro, filtro, filtro, filtro, filtro, filtro], (err, result) => {
            if (err) {
                resolve(err)
            } else {
                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function getById(id) {
    const id_user = id;
    const selectUserById = 'SELECT u.*, u.id AS legajo FROM usuarios u WHERE u.id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectUserById, [id_user], (err, result) => {
            if (!result[0]) {
                resolve(err);
            } else {
                const { password_hash, ...userWithoutPassword } = result[0];
                resolve(userWithoutPassword);
            }
        })
    });
    return promise;    
}

async function getRoles() {
    const selectAllRoles = 'SELECT * FROM roles';
    let promise = new Promise((resolve, reject) => {
        db.query(selectAllRoles, (err, result) => {
            if (err) {
                resolve(err)
            } else {
                let ret = [];
                result.map(r => {
                    const {...roles} = r;
                    ret.push(roles)
                });
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function setRolesUsuario(body) {
    const id = body.id;
    const roles = body.checked;
    const setRoles = 'INSERT INTO usuarios_roles (usuario_id, rol_id) VALUES (?, ?)'
    let promesas = [];

    roles.forEach((e) => {
        let promise = new Promise((resolve, reject) => {
            db.query(setRoles, [id, e], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })        
        })
        promesas.push(promise);
    })
    return promesas;
}

async function deleteRolesUsuario(body) {
    const id = body.id;
    const del = 'DELETE FROM usuarios_roles WHERE usuario_id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(del, [id], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }    
        })
    })        
    return promise;    
}

async function getRolesUsuario(body) {
    const id = body.id;
    const selectRoles = 'SELECT rol_id FROM usuarios_roles  WHERE usuario_id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectRoles, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })        
    })
    return promise;
}

async function altaUsuario(body) {
    try {
        const insertUsuario = 'INSERT INTO usuarios (dni, usuario, password_hash, nombre, email, estado, sucursal_id) VALUES (?, ?, ?, ?, ?, ?, ?)'
        const dni = body.dni;
        const usuario = body.username;
        const password_hash = await bcrypt.hash(body.password, 10);
        const nombre = body.nombre;
        const email = body.email;
        const sucursal_id = body.sucursal;
        const estado = body.estado

        let promise = new Promise((resolve, reject) => {
            db.query(insertUsuario, [dni, usuario, password_hash, nombre, email, estado, sucursal_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })        
        })
        return promise;
    } catch {
        return status(500).send();
    }   
}

async function actualizarUsuario(body) {
    const updateUsuario = 'UPDATE usuarios SET dni = ?, usuario = ?, nombre = ?, email = ?, estado = ?, sucursal_id = ? WHERE id = ?';
    const id = body.id;
    const dni = body.dni;
    const usuario = body.username;
    const nombre = body.nombre;
    const email = body.email;
    const sucursal_id = body.sucursal;
    const estado = body.estado

    let promise = new Promise((resolve, reject) => {
        db.query(updateUsuario, [dni, usuario, nombre, email, estado, sucursal_id, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })        
    })
    return promise;   
}

async function borrarUsuario(body) {
    const id = body.id;
    const deleteUser = 'UPDATE usuarios SET estado = "Eliminado"  WHERE id = ?'
    let promise = new Promise((resolve, reject) => {
        db.query(deleteUser, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })        
    })
    return promise;

}

async function recuperarPass(body) {
    //console.log(body)
    const user = body.user
    const selectUser = 'SELECT * FROM usuarios u WHERE u.usuario = ?'

    let promise = new Promise((resolve, reject) => {
        db.query(selectUser, [user], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.length > 0) {
                let user = {id: result[0].id, user: result[0].usuario, nombre: result[0].nombre, email: result[0].email, role: 'Suport'};
                const token = jwt.sign({ sub: user.id, role: user.role }, result[0].password_hash, {expiresIn: '15m'});
                const {...usuario} = user;
                resolve({...usuario, token});
            }
        })        
    })
    return promise;
}

async function validarToken(body) {
    const id = body.id
    const token = body.token
    const selectUser = 'SELECT password_hash FROM usuarios u WHERE u.id = ?'

    let hash = new Promise((resolve, reject) => {
        db.query(selectUser, [id], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.length > 0) {
                resolve(result[0].password_hash)
            }
        })        
    })
    return jwt.verify(token, await hash);
}

async function resetPass(id, pass) {
    const _id = id;
    const pass_has = await bcrypt.hash(pass, 10);
    const resetPass = 'UPDATE usuarios SET password_hash = ?  WHERE id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(resetPass, [pass_has, _id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })        
    })
    return promise;
}


async function buscarTotalUsuarios(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM usuarios';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarUsuariosActivos(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM usuarios where estado = "Activo"';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarUsuariosEliminados(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM usuarios where estado = "Eliminado"';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarUsuariosBloqueados(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM usuarios where estado = "Bloqueado"';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarUsuariosAdministradores(body) {
    const selectTotalUsuarios = 'SELECT count(usuario_id) cantidad FROM concesionario.usuarios_roles where rol_id = 1';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarUsuariosMecanicos(body) {
    const selectTotalUsuarios = 'SELECT count(usuario_id) cantidad FROM concesionario.usuarios_roles where rol_id = 2';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarUsuariosVendedores(body) {
    const selectTotalUsuarios = 'SELECT count(usuario_id) cantidad FROM concesionario.usuarios_roles where rol_id = 3';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarUsuariosSupervisores(body) {
    const selectTotalUsuarios = 'SELECT count(usuario_id) cantidad FROM concesionario.usuarios_roles where rol_id = 4';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarUsuariosAdministrativos(body) {
    const selectTotalUsuarios = 'SELECT count(usuario_id) cantidad FROM concesionario.usuarios_roles where rol_id = 5';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarUsuariosGerentes(body) {
    const selectTotalUsuarios = 'SELECT count(usuario_id) cantidad FROM concesionario.usuarios_roles where rol_id = 6';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarCantidadVentas(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM pedidos';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarCantidadReservas(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM pedidos where estado = "RESERVADO"';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarVentasIniciadas(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM pedidos where estado = "INICIADO"';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarVentasFinalizadas(body) {
    const sucursal = body.sucursal;
    const selectTotalUsuarios = 'SELECT count(f.id) cantidad FROM facturas f, usuarios u, sucursales s where f.estado = "PAGADA" and f.usuario_id = u.id and u.sucursal_id = s.id and s.id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [sucursal], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarVentasCanceladas(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM pedidos where estado = "CANCELADO"';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarUltimaVenta(body) {
    const sucursal = body.sucursal;
    const selectTotalUsuarios = 'SELECT max(f.fecha_hora) cantidad FROM facturas f,usuarios u, sucursales s where f.estado = "PAGADA" and f.usuario_id = u.id and u.sucursal_id = s.id and s.id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [sucursal], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}


async function buscarIngresosTotales(body) {
    const sucursal = body.sucursal;
    const selectTotalUsuarios = "select sum(f.saldo) as cantidad from facturas f, usuarios u, sucursales s where f.usuario_id = u.id and u.sucursal_id = s.id and s.id = ? and f.estado = 'PAGADA'";
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [sucursal], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarVentaPromedio(body) {
    const sucursal = body.sucursal;
    const selectTotalUsuarios = 'SELECT avg(f.total) cantidad FROM facturas f, usuarios u, sucursales s where f.usuario_id = u.id and u.sucursal_id = s.id and s.id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [sucursal], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarOrdenesTotales(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM ordenes_trabajo';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarOrdenesFinalizadas(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM ordenes_trabajo where estado = "FINALIZADA"';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}


async function buscarOrdenesCanceladas(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM ordenes_trabajo where estado = "CANCELADA"';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}


async function buscarOrdenesFacturadas(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM ordenes_trabajo where estado = "FACTURADA"';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarOrdenesIniciadas(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM ordenes_trabajo where estado = "INICIADA"';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarOrdenesPendientes(body) {
    const selectTotalUsuarios = 'SELECT count(id) cantidad FROM ordenes_trabajo where estado = "PENDIENTE"';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarUltimaOrden(body) {
    const selectTotalUsuarios = 'SELECT max(fecha_hora) cantidad FROM ordenes_trabajo';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarEgresosTotales(body) {
    const sucursal = body.sucursal;
    const selectTotalUsuarios = 'select sum(p.importe) as cantidad from pagos_proveedor p, usuarios u, sucursales s where p.usuario_id = u.id and u.sucursal_id = s.id and s.id = ?';
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [sucursal], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}

async function buscarVentasVendedor(body) {
    const sucursal = body.sucursal;
    const selectTotalUsuarios = "select s.nombre Sucursal,u.nombre Usuario,sum(f.saldo) Total,count(f.id) Cant_Ventas from usuarios u, sucursales s, facturas f where f.usuario_id = u.id and u.sucursal_id = s.id and f.estado = 'PAGADA' and s.id = ? group by u.id";
    let promise = new Promise((resolve, reject) => {
        db.query(selectTotalUsuarios, [sucursal], (err, result) => {
            if (err) {
                console.log(err)
                resolve(err)
            } else {

                let ret = [];
                result.map(u => {
                    const { password_hash, ...userWithoutPassword } = u;
                    ret.push(userWithoutPassword)
                });
                console.log(ret)
                resolve(ret)
            }    
        })
    });
    return promise;
}





/*

const selectAllUsers = 'SELECT u.id AS legajo, u.dni, u.usuario, u.nombre, u.email, u.estado, s.nombre AS sucursal FROM usuarios u, sucursales s WHERE (u.id like ? OR u.dni like ? OR u.usuario like ? OR u.nombre like ? OR u.email like ? OR u.estado like ?) and u.sucursal_id = s.id';

*/