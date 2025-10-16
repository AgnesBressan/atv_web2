
import express from "express"
import dogbreedController from "../controllers/dogbreed.controller.js"
import clientController from "../controllers/client.controller.js"
import petController from "../controllers/pet.controller.js"
import authController from "../controllers/auth.controller.js"
import mediaUploader from "../media/media.uploader.js"

const router = express.Router()

router.post("/signup", authController.register)
router.post("/signin", authController.login)

router.get("/breeds", dogbreedController.getAll)
router.get("/breeds/:id", dogbreedController.getById)
router.post("/breeds", authController.validateToken, dogbreedController.create) 


router.post("/clients", clientController.create)

router.get("/clients", clientController.findAll)
router.get("/clients/:id", authController.validateToken, clientController.findById)
router.delete("/clients/:id", authController.validateToken, clientController.deleteByPk)
router.put("/clients/:id", authController.validateToken, clientController.update)

router.get("/pets", authController.validateToken, petController.findAll)
router.get("/pets/:id", authController.validateToken, petController.findById)

router.post("/pets", mediaUploader.uploadFile.single('photo'), petController.create)
router.delete("/pets/:id", authController.validateToken, petController.deleteByPk)
router.put("/pets/:id", authController.validateToken, petController.update)
router.get("/clients/:id/pets", authController.validateToken, petController.findByClientId)


export default router