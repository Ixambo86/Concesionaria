const express = require('express');
const router = express.Router();
const config = require('config.json')
const apiService = require('../services/users.service');
const authorize = require('../../_helpers/authorize');
const sendEmail = require('../mailSender');

const Role = require('../../_helpers/role') 
/*
    require('_helpers/role')
    .then(res => { return res.reduce((json, value) => { json[value] = value; return json; }, {})})
    .then(res => Role = res)
    .then(() => {
      // routes
        router.post('/authenticate', authenticate);     // public route
        router.post('/solicitud_recupero', recuperarPass);
        router.get('/get_roles', authorize(Role.Administrador), getRoles);
        router.post('/agregar_usuario', authorize(Role.Administrador), altaUsuario);
        router.post('/borrar_usuario', authorize(Role.Administrador), borrarUsuario);
        router.post('/actualizar_usuario', authorize(Role.Administrador), actualizarUsuario);
        router.post('/set_roles_usuario', authorize(Role.Administrador), setRolesUsuario);
        router.post('/delete_roles_usuario', authorize(Role.Administrador), deleteRolesUsuario);
        router.post('/get_roles_usuario', authorize(Role.Administrador), getRolesUsuario);
        router.put('/get_usuarios', authorize(Role.Administrador), getAll); // admin only
        router.get('/:id', authorize(), getById);       // all authenticated users
    })
*/

// routes
router.post('/authenticate', authenticate);     // public route
router.post('/solicitud_recupero', recuperarPass);
router.post('/validar_token', validarToken);
router.post('/reset_pass', resetPass);
router.get('/get_roles', authorize(), getRoles);
router.post('/agregar_usuario', authorize(), altaUsuario);
router.post('/borrar_usuario', authorize(), borrarUsuario);
router.post('/actualizar_usuario', authorize(), actualizarUsuario);
router.post('/set_roles_usuario', authorize(), setRolesUsuario);
router.post('/delete_roles_usuario', authorize(), deleteRolesUsuario);
router.post('/get_roles_usuario', authorize(), getRolesUsuario);
router.put('/get_usuarios', authorize(), getAll);
router.get('/:id', authorize(), getById);      
router.put('/buscarTotalUsuarios', authorize(), buscarTotalUsuarios);
router.put('/buscarUsuariosActivos', authorize(), buscarUsuariosActivos);
router.put('/buscarUsuariosEliminados', authorize(), buscarUsuariosEliminados);
router.put('/buscarUsuariosBloqueados', authorize(), buscarUsuariosBloqueados);
router.put('/buscarUsuariosAdministradores', authorize(), buscarUsuariosAdministradores);
router.put('/buscarUsuariosMecanicos', authorize(), buscarUsuariosMecanicos);
router.put('/buscarUsuariosVendedores', authorize(), buscarUsuariosVendedores);
router.put('/buscarUsuariosAdministrativos', authorize(), buscarUsuariosAdministrativos);
router.put('/buscarUsuariosSupervisores', authorize(), buscarUsuariosSupervisores);
router.put('/buscarUsuariosGerentes', authorize(), buscarUsuariosGerentes);


router.put('/buscarCantidadVentas', authorize(), buscarCantidadVentas);
router.put('/buscarCantidadReservas', authorize(), buscarCantidadReservas);
router.put('/buscarVentasFinalizadas', authorize(), buscarVentasFinalizadas);
router.put('/buscarVentasCanceladas', authorize(), buscarVentasCanceladas);
router.put('/buscarVentasIniciadas', authorize(), buscarVentasIniciadas);
router.put('/buscarUltimaVenta', authorize(), buscarUltimaVenta);

router.put('/buscarIngresosTotales', authorize(), buscarIngresosTotales);
router.put('/buscarVentaPromedio', authorize(), buscarVentaPromedio);
router.put('/buscarEgresosTotales', authorize(), buscarEgresosTotales);
router.put('/buscarVentasVendedor', authorize(), buscarVentasVendedor);


router.put('/buscarOrdenesTotales', authorize(), buscarOrdenesTotales);
router.put('/buscarOrdenesFinalizadas', authorize(), buscarOrdenesFinalizadas);
router.put('/buscarOrdenesIniciadas', authorize(), buscarOrdenesIniciadas);
router.put('/buscarOrdenesCanceladas', authorize(), buscarOrdenesCanceladas);
router.put('/buscarOrdenesPendientes', authorize(), buscarOrdenesPendientes);
router.put('/buscarUltimaOrden', authorize(), buscarUltimaOrden);
router.put('/buscarOrdenesFacturadas', authorize(), buscarOrdenesFacturadas);


module.exports = router;

function authenticate(req, res, next) {
    apiService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).send({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

function getAll(req, res, next) {
    apiService.getAll(req.body)
    .then(users => res.send(users))
    .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    /*
    // only allow admins to access other user records
    if (id !== currentUser.sub && !currentUser.role.includes(Role.Administrador)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    */

    apiService.getById(req.params.id)
    .then(user => user ? res.send(user) : res.sendStatus(404))
    .catch(err => next(err));
}

function getRoles(req, res, next) {
    apiService.getRoles()
    .then(roles => res.send(roles))
    .catch(err => next(err));
}

function setRolesUsuario(req, res, next) {
    apiService.setRolesUsuario(req.body)
    .then(result => res.send(result))
    .catch(err => next(err));
}

function deleteRolesUsuario(req, res, next) {
    apiService.deleteRolesUsuario(req.body)
    .then(result => res.send(result))
    .catch(err => next(err));
}

function getRolesUsuario(req, res, next) {
    apiService.getRolesUsuario(req.body)
    .then(result => res.send(result))
    .catch(err => next(err));
}

function altaUsuario(req, res, next) {
    apiService.altaUsuario(req.body.datos)
    .then(result => res.send(result))
    .catch(err => next(err));
}

function actualizarUsuario(req, res, next) {
    apiService.actualizarUsuario(req.body.datos)
    .then(result => res.send(result))
    .catch(err => next(err));
}

function borrarUsuario(req, res, next) {
    apiService.borrarUsuario(req.body)
    .then((result) => res.send(result))
    .catch(err => next(err));
}

function recuperarPass(req, res, next) {
    apiService.recuperarPass(req.body)
    .then((user) => {
        sendEmail({
            from: 'suport@car-two.com.ar',
            to: user.email,
            subject:'Recupero de password',
            html:'<a href="' + config.urlClient + '/recuperar_pass?u=' + user.id + '&t=' + user.token + '">Siga este link para recuperar su password</a>'
        })
        res.sendStatus(200).send('Se envio un mail con informacion para realizar el recupero de password')
    })
    .catch(err => next(err));
}

function validarToken(req, res, next) {
    apiService.validarToken(req.body)
    .then((result) => res.send(result))
    .catch(err => next(err));
}

function resetPass(req, res, next) {
    const id = req.body.id;
    const pass = req.body.password;
    apiService.validarToken(req.body)
    .then(() => {
        apiService.resetPass(id, pass)
    })
    .then(() => res.sendStatus(200).send('pass reseted'))
    .catch(err => next(err))
}

function buscarTotalUsuarios(req, res, next) {
    apiService.buscarTotalUsuarios(req.body)
    .then(users => res.send(users))
    .catch(err => next(err));
}

function buscarUsuariosActivos(req,res,next){
    apiService.buscarUsuariosActivos(req.body)
    .then(users => res.send(users))
    .catch(err => next(err));
}

function buscarUsuariosEliminados(req,res,next){
    apiService.buscarUsuariosEliminados(req.body)
    .then(users => res.send(users))
    .catch(err => next(err));
}

function buscarUsuariosBloqueados(req,res,next){
    apiService.buscarUsuariosBloqueados(req.body)
    .then(users => res.send(users))
    .catch(err => next(err));
}

function buscarUsuariosAdministradores(req,res,next){
    apiService.buscarUsuariosAdministradores(req.body)
    .then(users => res.send(users))
    .catch(err => next(err));
}

function buscarUsuariosAdministrativos(req,res,next){
    apiService.buscarUsuariosAdministrativos(req.body)
    .then(users => res.send(users))
    .catch(err => next(err));
}

function buscarUsuariosVendedores(req,res,next){
    apiService.buscarUsuariosVendedores(req.body)
    .then(users => res.send(users))
    .catch(err => next(err));
}

function buscarUsuariosMecanicos(req,res,next){
    apiService.buscarUsuariosMecanicos(req.body)
    .then(users => res.send(users))
    .catch(err => next(err));
}

function buscarUsuariosSupervisores(req,res,next){
    apiService.buscarUsuariosSupervisores(req.body)
    .then(users => res.send(users))
    .catch(err => next(err));
}

function buscarUsuariosGerentes(req,res,next){
    apiService.buscarUsuariosGerentes(req.body)
    .then(users => res.send(users))
    .catch(err => next(err));
}

function buscarCantidadVentas(req, res, next) {
    apiService.buscarCantidadVentas(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarCantidadReservas(req, res, next) {
    apiService.buscarCantidadReservas(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarVentasCanceladas(req, res, next) {
    apiService.buscarVentasCanceladas(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarVentasFinalizadas(req, res, next) {
    apiService.buscarVentasFinalizadas(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarVentasIniciadas(req, res, next) {
    apiService.buscarVentasIniciadas(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarUltimaVenta(req, res, next) {
    apiService.buscarUltimaVenta(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarIngresosTotales(req, res, next) {
    apiService.buscarIngresosTotales(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarVentaPromedio(req, res, next) {
    apiService.buscarVentaPromedio(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarOrdenesTotales(req, res, next) {
    apiService.buscarOrdenesTotales(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarOrdenesFacturadas(req, res, next) {
    apiService.buscarOrdenesFacturadas(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarOrdenesFinalizadas(req, res, next) {
    apiService.buscarOrdenesFinalizadas(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarOrdenesCanceladas(req, res, next) {
    apiService.buscarOrdenesCanceladas(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarOrdenesIniciadas(req, res, next) {
    apiService.buscarOrdenesIniciadas(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarOrdenesPendientes(req, res, next) {
    apiService.buscarOrdenesPendientes(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarUltimaOrden(req, res, next) {
    apiService.buscarUltimaOrden(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarEgresosTotales(req, res, next) {
    apiService.buscarEgresosTotales(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}

function buscarVentasVendedor(req, res, next) {
    apiService.buscarVentasVendedor(req.body)
    .then(orden => res.send(orden))
    .catch(err => next(err))
}
