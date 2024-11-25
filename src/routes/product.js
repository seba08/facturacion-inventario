import { Router } from "express";
import { getProducts, postProduct } from "../controllers/product.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { body } from "express-validator";
import validarJwt from "../middlewares/validarJwt.js";



const productRouter = Router();


productRouter.get("/:id", (req, res) => {
    res.send("Product y ID")
})
productRouter.get("/", getProducts)
productRouter.post("/", 
validarJwt,
body("name").notEmpty().withMessage("Tienes que insertar el nombre del producto."),
body("price").notEmpty().withMessage("Tienes que insertar el precio del producto."),
body("stock").notEmpty().withMessage("Tienes que insertar la cantidad disponible del producto."),
body("category").notEmpty().withMessage("Tienes que insertar la categoría del producto."),
body("user").notEmpty().withMessage("Tienes que insertar el usuario que agregó el producto."),
validarCampos,    
postProduct)

productRouter.put("/:id", (req, res) => {
    res.send("Put Product")
})
productRouter.delete("/:id", (req, res) => {
    res.send("Delete Product")
})

export default productRouter;