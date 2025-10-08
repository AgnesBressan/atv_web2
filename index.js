import express from "express"
import routes from "./routes/api.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(express.static('public'))

app.listen(3000, function() {
    console.log("app executando na porta 3000")
})