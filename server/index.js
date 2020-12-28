require('rootpath')();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');
/*const cronMysqlBackup = require('cron-mysql-backup');

let options = {
    directory:'./dumps',
    cronSchedule:"25 18 * * *",
    connection:{
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'concesionario',
    },
    sendTo:'test@test.com',//Notifications will be sent to this address. This can also be an array of email addresses
    sendFrom:'concesionaria.autobot.2020@gmail.com',
    sendFromPassword:'AutobotLCS!',
    sendSuccessEmailAfterXBackups:2, //Send confirmation email after every 10 backups()
    maxBackups: 7*24 // the maximum number of backups(a weeks worth of hourly backups)
}; 
 
cronMysqlBackup(options);*/

const app = express();

/*
const users = [
    {
        user: "admin",
        pass: "$2b$10$VXJ/R8Sub6dGMFIIgF6.tO7CqQ6ivYip8fitxAqrksEAIJbf..CFC"
    },
    {
        user: "user",
        pass: "$2b$10$B4e1SJnPYsIcgJw1ruCnP.7O7ouLVTDw2cZ9yheRkLyvHlTFpIkxe"
    }
  ]
*/

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

// api routes
app.use('/api', require('./api/controllers/users.controller'));
app.use('/api', require('./api/controllers/turnos.controller'));
app.use('/api', require('./api/controllers/servicios.controller'));
app.use('/api', require('./api/controllers/ordenesTrabajo.controller'));
app.use('/api', require('./api/controllers/pedidos.controller'));
app.use('/api', require('./api/controllers/clientes.controller'));
app.use('/api', require('./api/controllers/automotores.controller'));
app.use('/api', require('./api/controllers/productosInventario.controller'));
app.use('/api', require('./api/controllers/proveedores.controller'));
app.use('/api', require('./api/controllers/productos.controller'));
app.use('/api', require('./api/controllers/facturacion.controller'));
app.use('/api', require('./api/controllers/pagos.controller'));
app.use('/api', require('./api/controllers/marcas.controller'));
app.use('/api', require('./api/controllers/modelos.controller'));
app.use('/api', require('./api/controllers/ordenesCompra.controller'));
app.use('/api', require('./api/controllers/remitos.controller'));
app.use('/api', require('./api/controllers/sucursales.controller'));
app.use('/api', require('./api/controllers/documentacion.controller'));
app.use('/api', require('./api/controllers/costumer.controller'));
app.use('/api', require('./api/controllers/reportes.controller'));
app.use('/api', require('./api/controllers/encuesta.controller'));
app.use('/api', require('./api/controllers/arqueo.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 3001;
const server = app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
/*


app.get('/users', (req, res) => {
    const selectAllUsers = 'SELECT * FROM usuarios';
    db.query(selectAllUsers, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            res.status(200).send(result);
        }
    })
});

app.post('/users', async (req, res) => {
    try {
        const insertUsuario = 'INSERT INTO usuarios (usuario, password_hash, nombre, email, activo, sucursal_id) VALUES (?, ?, ?, ?, "true", ?)'
        const usuario = req.body.user;
        const password_hash = await bcrypt.hash(req.body.pass, 10);
        const nombre = req.body.nombre;
        const email = req.body.email;
        const sucursal_id = req.body.sucursal;

        db.query(insertUsuario, [usuario, password_hash, nombre, email, sucursal_id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else {
                res.status(201).send('Usuario creado');
            }
        })        
    }
    catch {
        res.status(500).send();
    }     
});

app.listen(3001, () => {
    console.log('escuchando en puerto 3001');
});
*/
