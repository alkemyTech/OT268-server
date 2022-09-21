const jwt = require('jsonwebtoken')
require("dotenv").config();
const jwtKey = process.env.JWT_SECRET 
const expirationTime = 4000*60 // arbitrario

function newToken(req, res) {
    
    const { email , password } = req.body
    if (!email || !password) {
        
        return res.status(401).end()
    }
   
    const token = jwt.sign({ email }, jwtKey, {
        alg: "HS256",
        expiresIn: expirationTime
        })
    res.send({"token": token})
    res.end()
}

function authJWT(req, res){

    const token = req.header('Authorization')


    if (!token) return res.status(403).send('token not found').end()
    
    let payload
    try {
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) return res.status(401).send('invalid token').end()
        return res.status(400).send('something went wrong').end()
    }
    res.status(200).send(message: `${payload.email} authorized`)

}

module.exports = {
    newToken,
    authJWT,
    expirationTime,
    jwtKey
}