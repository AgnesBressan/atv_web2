import mongoose from "mongoose"
import dotenv from "dotenv"

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



const cli = await Client.findOne({document: '123456'})
console.log(cli)


export default { Client, Pet }
