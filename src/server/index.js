import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import connectionDB from "../config/conn.js";

import {
    productRouter, 
    categoryRouter, 
    userRouter, 
    invoiceRouter, 
    authRouter, 
    dashboardRouter, 
    customerRouter} from "../routes/index.js";


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 5000;

        //Llamada a los metodos de la clase

        //Conexion
        this.dbConnection();
        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
    }

    //dbConnection
    async dbConnection(){
        await connectionDB();
    }

    //middlewares
    middlewares(){
        this.app.use(express.json());
        this.app.use(express({urlencoded: false}));
        this.app.use(morgan("dev"));
        this.app.use(cors());
    }
    routes(){
        this.app.use("/products", productRouter )
        this.app.use("/categories", categoryRouter )
        this.app.use("/users", userRouter )
        this.app.use("/invoices", invoiceRouter )
        this.app.use("/customers", customerRouter)
        this.app.use("/auth", authRouter)
        this.app.use("/dashboard", dashboardRouter)
    }

    //listen
    listen(){
        this.app.listen(this.port, () => console.log(`Server running on port: ${this.port}`))
    }

}


export default Server;