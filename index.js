import express from 'express'   //IMPORTAR EXPRESSs
import dotenv from 'dotenv'  //IMPORTAR DOTENV
import colors from 'colors'  //IMPORTAR COLORS
import cors from 'cors'  //IMPORTAR CORS
import {db} from './config/db.js'  //IMPORTAR CONEXION A BASE DE DATOS
import servicesRoutes from './routes/servicesRoutes.js'  //IMPORTAR RUTAS
import authRoutes from './routes/authRoutes.js'  //IMPORTAR RUTAS

//variables de entorno
dotenv.config()

//CONFIGURAR APP
const app = express()

//leer datos via body
app.use(express.json())

//CONECTAR A BASE DE DATOS
db()




//CONFIGURAR CORS
const whitelist = process.argv[2] === '--postman' ? [process.env.FRONTEND_URL, undefined] : [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin, callback){
       if(whitelist.includes(origin)){
           //permite conexion
           callback(null, true)
        }else{
        //bloquear conexion
        callback(new Error('No permitido por CORS'))
        }

    }
}

app.use(cors(corsOptions))

//DEDFINIR RUTA
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)

//DEFINIR PUERTO

const port = process.env.port || 4000

//ARRANCAR SERVIDOR

app.listen(port, () => {
    console.log(colors.blue.bgMagenta( `Servidor corriendo en el puerto ${port}`))
})

