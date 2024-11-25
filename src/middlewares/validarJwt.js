import jwt from "jsonwebtoken";


const validarJwt = async (req, res, next) => {

    try {
        const token = req.header("x-token")
        if(!token){
            return res.status(401).json({
                msg: "No hay token en la petición"
            })
        }

        jwt.verify(token, "misecreto", (err, decoded) => {
            if(err){
                if(err.name = "TokenExpiredError"){
                    return res.status(401).json({msg: "El token ha expirado. Por favor, inicia sesión nuevamente."})
                }
                
                return res.status(401).json({msg: "Token inválido"})
            }

            req.user = decoded;
           
            next();
        })
        
    } catch (error) {
        console.log(`Error al validar el token: ${error}`)
        return res.status(400).json({msg: "Error al validar el token"})
    }
}

export default validarJwt;