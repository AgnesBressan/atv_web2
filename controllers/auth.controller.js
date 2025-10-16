import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import dotenv from "dotenv"

dotenv.config()
const secret = process.env["AUTH_SECRET"]

async function register(request, response) {
    if (!request.body.password || !request.body.email) {
        return response.status(400).json({ message: "Informe usuário e senha!" })
    }
    
    let user = await User.findOne({ where: { email: request.body.email } })
    if (user) {
        return response.status(400).json({ message: "Usuário já cadastrado!" })
    }
    
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(request.body.password, salt)
    
    User.create({
        email: request.body.email,
        password: hashedPassword,
    })
        .then((result) => {
            const meuToken = getToken(
                result.dataValues.id,
                result.dataValues.email,
            )
            response.status(201).json({ token: meuToken })
        })
        .catch((erro) => {
            console.error("Erro no registro:", erro) // Use console.error para logs
            response.status(500).json({ 
                message: "Erro interno do servidor ao registrar usuário.", 
                errorDetails: erro.message || JSON.stringify(erro)
            })
        })
}

function getToken(uid, uemail) {
    const meuToken = jwt.sign(
        {
            sub: uid,
            email: uemail,
        },
        secret,
        {
            expiresIn: "30d",
        },
    )
    return meuToken
}

async function login(request, response) {
    if (!request.body.password || !request.body.email) {
        return response.status(400).json({ message: "Informe usuário e senha!" })
    }

    const user = await User.findOne({
        where: { email: request.body.email },
    })
    if (!user) {
        return response.status(400).json({ message: "Usuário não cadastrado!" })
    }

    const isEqual = bcrypt.compareSync(request.body.password, user.password)
    
    if (!isEqual) {
        return response.status(401).json({ message: "Usuário e senha inválidos!" })
    }
    
    const meuToken = getToken(user.id, user.email)
    response
        .status(200)
        .json({ id: user.id, email: user.email, token: meuToken })
}

async function validateToken(request, response, next) {
    let token = request.headers.authorization
    try {
        if (token && token.startsWith("Bearer")) {
            token = token.substring(7, token.length)
            const decodedToken = jwt.verify(token, secret)
            next()
        } else {
            return response.status(401).json({ message: "Unauthorized: Token ausente ou mal formatado" })
        }
    } catch (e) {
        return response.status(401).json({ message: "Unauthorized: Token inválido ou expirado" })
    }
}

function findAll(request, response) {
    User.findAll()
        .then(function (res) {
            response.status(200).json(res)
        })
        .catch(function (err) {
            console.error("Erro ao buscar usuários:", err)
            response.status(500).json({ 
                message: "Erro interno do servidor ao buscar usuários.", 
                errorDetails: err.message || JSON.stringify(err)
            })
        })
}

export default { register, login, validateToken, findAll }