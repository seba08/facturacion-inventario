import { request, response } from "express";

import Product from "../models/product.js";


const getProduct = async (req, res = response)=> {

    res.status(200).json({
        msg: "Product"
    })

}

const getProducts = async (req, res = response)=> {

    const products = await Product.find({}).populate("user", "name")
    res.status(200).json({
        msg: "Products",
        products
    })

}
/* 
  /* Agregar usuario.
  *  Que no se repita el email
*/
const postProduct = async ( req = request, res = response ) => {
    const { id, role } = req.user
    //  Validar que el producto no existe en la base de datos, si existe no podemos duplicarlo
    //  Validar por ID
    const ProductExist = await Product.findOne({name: req.body.name})
    if(ProductExist){
        return res.status(400).json({
            msg: `El producto: ${req.body.name} se encuentra registrado`
        })
    }
    console.log(req.body)
    const newProduct = new Product({...req.body, "user": id})
    newProduct.save();
    res.status(201).json({
        msg: "Product added",
        newProduct
    })
}
const putProduct = async ( req = request, res = response ) => {


    res.status(200).json({
        msg: "Product updated"
    })
}
const deleteProduct = async ( req = request, res = response ) => {


    res.status(200).json({
        msg: "Product deleted"
    })
}


export {
    getProduct,
    getProducts,
    postProduct,
    putProduct,
    deleteProduct
}