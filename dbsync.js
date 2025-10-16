import express from "express"
import cors from "cors" 
import sequelize from "./models/dbconfig.js"
import routes from "./routes/api.routes.js"
import clientController from "./controllers/client.controller.js"

const app = express()
const PORT = 3000

app.use(cors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes) 

app.use(express.static('public'))

async function startServer() {
    try {
        await sequelize.authenticate() 
        console.log('✅ Conexão com o Neon DB estabelecida com sucesso.')
        
        await sequelize.sync() 
        console.log('✅ Modelos sincronizados com o banco de dados.')

        app.listen(PORT, function() {
            console.log(`\n🚀 App executando em http://localhost:${PORT}`)
            console.log(`🔗 API disponível em http://localhost:${PORT}/api`)
        })

    } catch (error) {
        console.error('❌ Falha ao iniciar o servidor ou conectar ao DB:', error)
    }
}

startServer()