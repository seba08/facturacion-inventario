import { validationResult } from "express-validator";


const validarCampos = async (req, res, next) =>{


    const results = validationResult(req);
    if(!results.isEmpty()){
        return res.status(400).json({
            msg: results.array()
        })
    }

    next();

}

export {
    validarCampos
}