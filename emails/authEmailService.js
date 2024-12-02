import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({name, email, token}) {
    const transporter = createTransport(
        
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    //enviar email
    const info = await transporter.sendMail({
        from: 'SaludKine <cuentas@appSaudKine.com>',
        to: 'correo4@correo.com',
        subject: 'SaludKine - Verifica tu cuenta',
        text: 'SaludKine - Verifica tu cuenta',
        html: `
            <p>Hola ${name}, confirma tu cuenta en SaludKine</p>
            <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
            <p>Si no fuiste tu, ignora este mensaje</p>
        `
    })

    console.log('Mensaje enviado', info.messageId)
}