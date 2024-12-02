import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'


function validateObjectId(id, res) {
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('ID no valido')
        
        return res.status(400).json({
            msg: error.message
        })
    }
}

function handleNotFoundErrors(message, res) {
    const error = new Error(message)
        
        return res.status(404).json({
            msg: error.message
        })
}

const uniqueId = () => Date.now().toString(32) + Math.random().toString(32).substring(2)

const generateJWT = (id) => {
    const token  = jwt.sign({id}, process.env.SECRET, {
        expiresIn: '8h'

    }) 

    return token
}

export{
    validateObjectId,
    handleNotFoundErrors,
    uniqueId,
    generateJWT
}