const jwt = require ("jsonwebtoken")
const User = require ("../models/User.model")


//Middleware

/**
 * Este nos va a servir para vefiricar si tengo un usuario loggeado
 */

//Verifique Token

exports.verifyToken = (req,res,next) =>{
    console.log("los cookies",req.cookies)

    const {headload,signature} = req.cookies

    if(!headload || !signature){
        return res.status(401).json({errorMessage:"Unauthorized cookie"})
    }

    jwt.verify(`${headload}.${signature}`,process.env.SUPER_SECRET,{complete:true},(err,decoded)=>{
        //esto es cuando tiene error en la verificacion
        if(err){
            return res.status(401).json({errorMessage:"Unauthorized"})
        }
        console.log("que es decoded?",decoded)
        User.findById(decoded.userId)
        .then(user=>{
            req.user=user //aqui guardo mi usuario en el re para usarlo en los otros endpoints o middelewares
            next() //nos da el paso para la siguinete accion || ruta
        })
        .catch(error=>{
            res.status(401).json({errorMessage:"Algo salio mal,checate la consola",error})
        })
    })
}


exports.createJWT = (user)=> {
return jwt.sign({
    userId:user._id,
    email:user.username,

},process.env.SUPER_SECRET,{expiresIn:'24h'}).split('.')
}

exports.clearRes = (data)=>{
const {password,__v,updatedAt, ...cleanedData} = data
return cleanedData

}