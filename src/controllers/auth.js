import { request, response } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";




const userAuth = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Validar si el usuario existe en la base de datos
        const userExist = await User.findOne({email})
        if(!userExist){
            return res.status(401).json({
                msg: "El usuario no existe en la BD. Registrate primero"
            })
        }

        // Entonces, si el usuario existe, validamos las contraseñas
        userExist.comparePassword(password)
        .then(response => {
            if(!response){
                return res.status(401).json({
                    msg: "Las contraseñas no coinciden"
                })
            }else{

                // Generar el jwt - Poner esto en un funcion, por ejemplo dentro de la carpeta helpers
                const token = jwt.sign({id: userExist._id, role: userExist.role}, "misecreto", {expiresIn: "1h"})
                
    
                // Mandar la respuesta al cliente
                res.status(200).json({
                    msg: "Login exitoso...!",
                    user: {
                        name: userExist.name,
                        email: userExist.email
                    },
                    token
                })
            }

        })
        .catch(err => {
            if(err){
                console.log(err)
                return res.status(400).json({msg: `Error al validar las contraseñas...!`})
            }
        })
        
    } catch (error) {
        throw new Error(`Error al loguear al usuario ${error}`)
    }


}



export {
    userAuth
}