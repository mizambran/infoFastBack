import { Router } from "express";
import ventasRoutes from './ventas.routes.js'
import usuariosRoutes from './usuarios.routes.js'



const router = Router()

router.use('/ventas', ventasRoutes)
router.use('/usuarios', usuariosRoutes)



export default router