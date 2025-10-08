import express from "express"
import dogbreedController from "../controllers/dogbreed.controller.js"
import clientController from "../controllers/client.controller.js"
import petController from "../controllers/pet.controller.js"
import authController from "../controllers/auth.controller.js"
import mediaUploader from "../media/media.uploader.js"

const router = express.Router()

router.all("/clients", authController.validateToken)
router.all("/pets", authController.validateToken)
router.post("/signup", authController.register)
router.post("/signin", authController.login)

router.get("/breeds", dogbreedController.getAll)
router.get("/breeds/:id", dogbreedController.getById)
router.post("/breeds", dogbreedController.create)

router.get("/clients", clientController.findAll)
router.get("/clients/:id", clientController.findById)
router.post("/clients", clientController.create)
router.delete("/clients/:id", clientController.deleteByPk)
router.put("/clients/:id", clientController.update)

router.get("/pets", petController.findAll)
router.get("/pets/:id", petController.findById)
router.post("/pets", mediaUploader.uploadFile.single('photo'), petController.create)
router.delete("/pets/:id", petController.deleteByPk)
router.put("/pets/:id", petController.update)
router.get("/clients/:id/pets", petController.findByClientId)

export default router