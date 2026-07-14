import { genSaltSync, hashSync } from "bcrypt"
import Usuario from "../models/usuario.js"
import mongoose from "mongoose"


export const crearUsuario = async(req, res) => {
    try {
        const existeElUsuario = await Usuario.findOne({email: req.body.email})
        if(existeElUsuario){
            return res.status(400).json({mensaje:"Ya existe un usuario con este email."})
        }
        const saltos = genSaltSync(10)
        req.body.password = hashSync(req.body.password, saltos)

        const nuevoUsuario = new Usuario(req.body)
        await nuevoUsuario.save()
        res.status(201).json({mensaje:"Usuario creado con éxito!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo crear el usuario"})
    }
}




export const eliminarUsuario = async(req, res) => {
    try {
        const id = req.params.id
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({mensaje:"El id no es válido"})
        }
        const usuarioEncontrado = await Usuario.findByIdAndDelete(id)
        if(!usuarioEncontrado){
            return res.status(404).json({mensaje:"No se encontró el usuario solicitado"})
        }
        res.status(200).json({mensaje:"Se eliminó el usuario!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo eliminar el usuario"})
    }
}
