import { Router } from "express";
import ventasRoutes from './ventas.routes.js'


const router = Router()

router.use('/ventas', ventasRoutes)

export default router