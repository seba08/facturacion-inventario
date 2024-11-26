import { request, response } from "express";

import Product from "../models/product.js";

//CRUD BASICO
const getProduct = async (req, res = response)=> {
    const productId = req.params.id
    const productExist = await Product.findById(productId)
    if(!productExist){
        return res.status(400).json({
            msg: `El producto: ${productId} se encuentra registrado`
        })
    }
    if(productExist.stock === 0){
        return res.status(200).json({
            msg: `El producto: '${productExist.name}' existe en la BD, pero no hay en stock.`
        })
    }
    res.status(200).json({
        msg: "Product",
        productExist
    })

}

const getProducts = async (req, res = response)=> {

    const products = await Product.find({stock: {$gt:0}}).populate("user", "name")
    const count = await Product.find({stock: {$gt:0}}).countDocuments()
    res.status(200).json({
        msg: "Products",
        count,
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
    const productExist = await Product.findOne({name: req.body.name})
    if(productExist){
        return res.status(400).json({
            msg: `El producto: ${req.body.name} se encuentra registrado`
        })
    }

    // Validar que sea administrador
    if(role !== "admin"){
        return res.status(401).json({
            msg: "No tienes permiso para agregar productos."
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
    const { id, role } = req.user;
    const productId = req.params.id;

    // Validar que el producto existe por el ID
    const productExist = await Product.findById(productId);
    if(!productExist){
        return res.status(400).json({
            msg: `El producto con ID: ${productId} no existe nen la BD.`
        })
    }
    // Validar que sea administrador
    if(role !== "admin"){
        return res.status(401).json({
            msg: "No tienes permiso para actualizar productos."
        })
    }

    const updateProduct = await Product.findByIdAndUpdate(productId, {...req.body}, {new: true})
    updateProduct.save();
    res.status(200).json({
        msg: "Product updated"
    })
}
const deleteProduct = async ( req = request, res = response ) => {
    const { id, role } = req.user;
    const productId = req.params.id;

    // Validar que el producto existe por el ID
    const productExist = await Product.findById(productId);
    if(!productExist){
        return res.status(400).json({
            msg: `El producto con ID: ${productId} no existe nen la BD.`
        })
    }
    // Validar que sea administrador
    if(role !== "admin"){
        return res.status(401).json({
            msg: "No tienes permiso para actualizar productos."
        })
    }
    const deleteProduct = await Product.findByIdAndUpdate(productId, {stock:0}, {new: true});
    deleteProduct.save();
    res.status(200).json({
        msg: "Product deleted"
    })
}


//EndPoints para los filtros

const productLowStock = async (req, res) => {
    const inStock = 5;

    const products = await Product.find({stock:{$lte: inStock}})

    res.status(200).json({
        msg: "Estos son los productos que tienen poco Stock",
        products
    })
}

const productStatsByCategory = async (req, res) => {
    try {
        const result = await Product.aggregate([
        {
            $match: { stock: { $gt: 0 } } // Filtra productos con stock mayor a 0
        },
        {
            $group: {
            _id: '$category', // Agrupa por categoría
            products: { $push: { name: '$name', price: '$price', stock: '$stock' } } // Incluye los datos relevantes
            }
        },
        {
            $lookup: {
            from: 'categories', // Nombre de la colección de categorías
            localField: '_id', // Campo en Product que coincide con _id de Category
            foreignField: '_id', // Campo _id de la colección Category
            as: 'categoryDetails' // Alias para los detalles de la categoría
            }
        },
        {
            $unwind: '$categoryDetails' // Despliega los detalles de la categoría (de array a objeto)
        },
        {
            $project: {
            _id: 0, // Excluye el ID generado automáticamente
            category: '$categoryDetails.name', // Muestra el nombre de la categoría
            products: 1 // Mantiene los productos agrupados
            }
        }
        ]);

        res.status(200).json({
            msg: "Productos por categoría",
            result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export {
    getProduct,
    getProducts,
    postProduct,
    putProduct,
    deleteProduct,
    productLowStock,
    productStatsByCategory
}