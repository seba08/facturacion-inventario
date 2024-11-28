import { Router } from "express";
import validarJwt from "../middlewares/validarJwt.js";
import User from "../models/user.js";
import Product from "../models/product.js";

const dashboardRouter = Router();

dashboardRouter.get("/", validarJwt, async (req, res) => {
    const {id} = req.user;
    
    try {
        const user = await User.findById(id)
        const products = await Product.find({})
        if(!user){
            return res.status(404).json({
                msg: "Usuario no existe en la BD."
            })
        }
        console.log(user)
        res.status(200).json({
            result:{
                user: user.name,
                products
            }
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }


})


export default dashboardRouter;