import mongoose, { Schema } from "mongoose";



const usuarioEsquema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(valor) => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor)
            },
            message:"El formato del email no es válido"
        }
    },
    password:{
        type:String,
        required:true
    },
    im_client_id:{
        type:String,
        required:true
    },
    im_client_secret:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        enum:["admin", "cliente"],
        default:"cliente"
    },
    activo:{
        type:Boolean,
        default:true
    }
},
{timestamps:true}
)

const Usuario = mongoose.model('usuario', usuarioEsquema)

export default Usuario