<<<<<<< HEAD
const jwt = require('jsonwebtoken')

const jwtKey = "shhhhh" // arbitrario y sólo para el primer sprint. NO LO ALMACENEN EN LA FUNCIÓN SINO EN UN ARCHIVO .ENV
const expirationTime = 4000*60 // arbitrario también

function newToken(req, res) {
    
    const { email , password } = req.body
    if (!email || !password) {
        
        return res.status(401).end()
    }
   
    const token = jwt.sign({ email }, jwtKey, {
        algorithm: "HS256",
        expiresIn: expirationTime
        })
    res.send({"token": token})
    res.end()
}

function authJWT(req, res){

    const token = req.header('Authorization')


    if (!token) return res.status(403).end()
    
    let payload
    try {
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) return res.status(401).end()
        return res.status(400).end()
    }
    res.send(`${payload.email} authorized`)
}

module.exports = {
    newToken,
    authJWT,
    expirationTime,
    jwtKey
=======
const jwt = require('jsonwebtoken')

const jwtKey = "shhhhh" // arbitrario y sólo para el primer sprint. NO LO ALMACENEN EN LA FUNCIÓN SINO EN UN ARCHIVO .ENV
const expirationTime = 4000*60 // arbitrario también

function newToken(req, res) {
    
    const { email , password } = req.body
    if (!email || !password) {
        
        return res.status(401).end()
    }
   
    const token = jwt.sign({ email }, jwtKey, {
        algorithm: "HS256",
        expiresIn: expirationTime
        })
    res.send({"token": token})
    res.end()
}

function authJWT(req, res){

    const token = req.header('Authorization')


    if (!token) return res.status(403).end()
    
    let payload
    try {
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) return res.status(401).end()
        return res.status(400).end()
    }
    res.send(`${payload.email} authorized`)
}

module.exports = {
    newToken,
    authJWT,
    expirationTime,
    jwtKey
}