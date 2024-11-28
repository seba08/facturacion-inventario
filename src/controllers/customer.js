
import Customer from "../models/customer.js"



const getCustomers = async (req, res) =>{

    res.json({
        msg: "Customers"
    })
}


const postCustomer = async ( req = request, res = response ) => {
    const { cedula } = req.body
    //  Validar que el usuario no existe en la base de datos, si existe no podemos duplicarlo
    //  Validar por email
    const customerExist = await Customer.findOne({cedula})
    if(customerExist){
        return res.status(400).json({
            msg: `El cliente con la cédula: ${cedula} se encuentra registrado`
        })
    }
    console.log(req.body)
    const newCustomer = new Customer(req.body)
    newCustomer.save();
    res.status(201).json({
        msg: "Customer added",
        newCustomer
    })
}

export {
    getCustomers,
    postCustomer
}