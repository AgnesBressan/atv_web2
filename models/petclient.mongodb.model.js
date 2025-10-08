import mongoose from "mongoose"
import dotenv from "dotenv"

//dotenv.config()
//const MONGODB_URI = process.env['MONGODB_URI']
await mongoose.connect("mongodb+srv://brunaru_db_user:anx123456@aulasbd.g6mpzey.mongodb.net/?retryWrites=true&w=majority&appName=aulasbd")

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  document: { type: String, required: true },
})
const Client = mongoose.model("Client", ClientSchema)

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: String,
  birth: String,
  photo: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
})
const Pet = mongoose.model("Pet", PetSchema)

/*await Client.create({
  name: "Jonas B.",
  document: "123456"
})*/

const cli = await Client.findOne({document: '123456'})
console.log(cli)
/*const pet1 = await Pet.create({
  name: "Astolfo",
  type: "Dog",
  breed: "Shiba",
  birth: "22/01/2024",
  photo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Picography-curious-dog-animal-pet-house-home-sm-1.jpg",
  owner: cli.id
})

console.log(cli)
console.log(pet1)*/

export default { Client, Pet }
