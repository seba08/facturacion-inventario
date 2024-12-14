import { request, response } from "express";

import Category from "../models/category.js";


const getCategory = async (req, res = response)=> {

    res.status(200).json({
        msg: "Category"
    })

}

const getCategories = async (req, res = response)=> {

    try {
        const categories = await Category.find({});
        res.status(200).json({
            msg: "Categories",
            categories
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al mostrar las categorías."
        })
    }

}
/* 
  /* Agregar usuario.
  *  Que no se repita el email
*/
const postCategory = async ( req = request, res = response ) => {
    
    //  Validar que la categoría no existe en la base de datos, si existe no podemos duplicarlo
    //  Validar por el nombre
    const categoryExist = await Category.findOne({name: req.body.name})
    if(categoryExist){
        return res.status(400).json({
            msg: `La categoría: ${req.body.name} se encuentra registrada`
        })
    }
    console.log(req.body)
    const newCategory = new Category(req.body)
    newCategory.save();
    res.status(201).json({
        msg: "Category added"
    })
}
const putCategory = async ( req = request, res = response ) => {


    res.status(200).json({
        msg: "Category updated"
    })
}
const deleteCategory = async ( req = request, res = response ) => {


    res.status(200).json({
        msg: "Category deleted"
    })
}


export {
    getCategory,
    getCategories,
    postCategory,
    putCategory,
    deleteCategory
}