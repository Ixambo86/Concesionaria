const mysql = require('mysql');

const dbCred = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'concesionario'
};

const dbConection = mysql.createPool(dbCred);

module.exports = dbConection;
