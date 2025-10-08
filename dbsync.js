import Client from "./models/client.model.js"
import Pet from "./models/pet.model.js"

await Client.sync()
await Pet.sync()

Client.findAll().then(clients => {
  for(let client of clients) {
    console.log(client.dataValues)
  }
})