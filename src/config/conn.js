import mongoose from "mongoose";


const connectionDB = async () => {
    const URI = process.env.MONGO_CONN;
    try {
        await mongoose.connect(URI)

        console.log("Conexión exitosa...!")
        
    } catch (error) {
        throw new Error (`Error al conectarse a la base de datos: ${error}`)
    }
}


export default connectionDB;