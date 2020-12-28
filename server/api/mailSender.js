const nodemailer = require('nodemailer');

/*
const mailCred = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'evan8@ethereal.email',
        pass: '8XYC4fwj9PE46Mq7Hx'
    }
}
*/

const mailCred = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'concesionaria.autobot.2020@gmail.com', 
        pass: 'AutobotLCS!'
    }
}

const mailer = nodemailer.createTransport(mailCred)

module.exports = sendEmail;

async function sendEmail({ from, to, subject, html }) {
    await mailer.sendMail({ from, to, subject, html })
}
