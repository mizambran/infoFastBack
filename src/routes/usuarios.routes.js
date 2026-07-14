import { Router } from "express"
import validacionUsuario from "../middlewares/validacionUsuario.js"
import { crearUsuario, eliminarUsuario } from "../controllers/usuarios.controllers.js"



const router = Router()

router.route('/').post(validacionUsuario, crearUsuario)



router.route('/:id').delete(eliminarUsuario)


export default router