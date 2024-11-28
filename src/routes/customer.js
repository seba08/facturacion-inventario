import { Router } from "express";
import { getCustomers, postCustomer } from "../controllers/customer.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { body } from "express-validator";


const customerRouter = Router();
customerRouter.get("/", getCustomers)
customerRouter.post("/", 
body("cedula").notEmpty().withMessage("La cédula no puede estar vacía"),
body("name").notEmpty().withMessage("El nombre no puede estar vacío"),
validarCampos,
postCustomer);

export default customerRouter;