const sendEmail = require('../mailSender');

module.exports = {
    enviarEncuesta
}

async function enviarEncuesta(body) {
    var asunto = body.asunto
    var titulo = 'La calificación es de ' + body.puntaje + ' puntos'
    var mensaje = 'Se destaca: ' + body.atributo + '. Mensaje positivo: ' + body.msjBueno + ', Mensaje negativo: ' + body.msjMalo;

     sendEmail({from: 'concesionaria.autobot.2020@gmail.com', to: 'encuesta.autobot@gmail.com',
     subject: asunto, html: '<h2>' + titulo +'</h2> <p>' + mensaje +'</p>'});
}