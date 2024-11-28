import { Router } from "express";
import { deleteProduct, 
    getProduct, 
    getProductPaginated, 
    getProducts, 
    postProduct, 
    productLowStock, 
    productStatsByCategory, 
    putProduct } from "../controllers/product.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { body, param } from "express-validator";
import validarJwt from "../middlewares/validarJwt.js";



const productRouter = Router();



productRouter.get("/", getProducts)
productRouter.get("/paginated", getProductPaginated)
productRouter.post("/", 
validarJwt,
body("name").notEmpty().withMessage("Tienes que insertar el nombre del producto."),
body("price").notEmpty().withMessage("Tienes que insertar el precio del producto."),
body("stock").notEmpty().withMessage("Tienes que insertar la cantidad disponible del producto."),
body("category").notEmpty().withMessage("Tienes que insertar la categoría del producto."),
body("user").notEmpty().withMessage("Tienes que insertar el usuario que agregó el producto."),
validarCampos,    
postProduct)

productRouter.put("/:id", 
validarJwt,
param("id").isMongoId().withMessage("No es un ID de Mongo válido"),
param("id").notEmpty().withMessage("No se encontró el ID del producto"),
body("name").notEmpty().withMessage("Tienes que insertar el nombre del producto."),
body("price").notEmpty().withMessage("Tienes que insertar el precio del producto."),
body("stock").notEmpty().withMessage("Tienes que insertar la cantidad disponible del producto."),
body("category").notEmpty().withMessage("Tienes que insertar la categoría del producto."),
body("user").notEmpty().withMessage("Tienes que insertar el usuario que agregó el producto."),
validarCampos,
putProduct
)
productRouter.delete("/:id", 
validarJwt,
param("id").isMongoId().withMessage("No es un ID de Mongo válido"),
param("id").notEmpty().withMessage("No se encontró el ID del producto"),
validarCampos,
deleteProduct
)
productRouter.get("/low-stock", productLowStock)
productRouter.get('/stats', productStatsByCategory);
  

productRouter.get("/:id", 
param("id").isMongoId().withMessage("No es un ID de Mongo válido"),
param("id").notEmpty().withMessage("No se encontró el ID del producto"),
validarCampos,
getProduct
)



export default productRouter;