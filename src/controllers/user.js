import { request, response } from "express";

import User  from "../models/user.js";


const getUser = async (req, res = response)=> {

    res.status(200).json({
        msg: "User"
    })

}

const getUsers = async (req, res = response)=> {

    const users = await User.find({})
    res.status(200).json({
        msg: "Users",
        users
    })

}
/* 
  /* Agregar usuario.
  *  Que no se repita el email
*/
const postUser = async ( req = request, res = response ) => {
    
    //  Validar que el usuario no existe en la base de datos, si existe no podemos duplicarlo
    //  Validar por email
    const userExist = await User.findOne({emial: req.body.email})
    if(userExist){
        return res.status(400).json({
            msg: `El usuario con email: ${req.body.email} se encuentra registrado`
        })
    }
    console.log(req.body)
    const newUser = new User(req.body)
    newUser.save();
    res.status(201).json({
        msg: "User added"
    })
}
const putUser = async ( req = request, res = response ) => {


    res.status(200).json({
        msg: "User updated"
    })
}
const deleteUser = async ( req = request, res = response ) => {


    res.status(200).json({
        msg: "User deleted"
    })
}


export {
    getUser,
    getUsers,
    postUser,
    putUser,
    deleteUser
}