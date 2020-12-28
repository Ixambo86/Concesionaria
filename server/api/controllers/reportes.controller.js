const express = require('express');
const router = express.Router();
const apiService = require('../services/reportes.service');
const authorize = require('_helpers/authorize')
const request = require('request');

//const generarReporte = require('_helpers/reporter')


// routes
router.get('/reportes/balance', /*authorize(),*/ getBalance);
router.get('/reportes/balance_sucursales', /*authorize(),*/ getBalanceSucursales);

module.exports = router;

function getBalance(req, res, next) {
    let balance = {
        sucursal: '',
        periodo: req.query.f_desde + ' / ' + req.query.f_hasta,
        arqueo: '',
        totalIngreso: '',
        totalEgreso: ''
    }

    apiService.buscarIngresos(req.query)
    .then(result => {balance.sucursal = result.sucursal;
                    balance.arqueo = result.ingresos})
    .then(() => apiService.buscarEgresos(req.query))
    .then(r => {balance.arqueo = balance.arqueo.concat(r.egresos)})
    .then(() => apiService.totalIngresos(req.query))
    .then(ret => {balance.totalIngreso = ret[0].total})
    .then(() => apiService.totalEgresos(req.query))
    .then(re => {balance.totalEgreso = re[0].total})
    .then(() => {
        const data = {
            template: {shortid: 'qQbFoZcHZs'},
            data: balance,
            options: {
                preview: true
            }
        }
        const options = {
            uri: 'http://localhost:5488/api/report',
            method: 'POST',
            json: data
        }
        request(options).pipe(res)
    })
    .catch(err => next(err));

}

function getBalanceSucursales(req, res, next) {
    //const template = req.query.template;
    let f_desde = new Date(req.query.f_desde);
    let f_hasta = new Date(req.query.f_hasta);
    
    let query ={
        sucur_id: '',
        f_desde: '',
        f_hasta: ''
    }
    
    let periodo = [];
    do {
        let aux = [];
        aux.push(f_desde);
        let mes = f_desde.getMonth();
        console.log(mes);
        mes++;
        date = new Date(f_desde.setMonth(mes))
        aux.push(date)
        console.log(aux)
        periodo.push(aux)
    } while (f_desde <= f_hasta)
    console.log(periodo)
/*
    let datos = {
        data: []
    };

    let balance = {
        sucursal: '',
        totalIngreso: '',
        totalEgreso: ''
    };

    apiService.buscarSucursales()
    .then(suc => {
        suc.forEach(s => {
            balance.sucursal = s.sucursal;
            query.sucur_id = s.id;
            apiService.totalIngresos(query)
            .then(ret => {balance.totalIngreso = ret[0].total})
            .then(() => apiService.totalEgresos(query))
            .then(re => {balance.totalEgreso = re[0].total})
    
        });
    })
    .then(() => apiService.totalIngresos(req.query))
    .then(() => {
        const data = {
            template: {shortid: template},
            data: datos,
            options: {
                preview: true
            }
        }
        const options = {
            uri: 'http://localhost:5488/api/report',
            method: 'POST',
            json: data
        }
        request(options).pipe(res)
    })
    .catch(err => next(err));
*/
}