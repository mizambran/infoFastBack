import { Router } from "express";
import { listarEmpresas } from "../controllers/ventas.controllers.js";



const router = Router()

router.route('/').get(listarEmpresas)

export default router