import Invoice from "../models/invoice.js";



const getInvoices = async (req, res) => {

    try {
        const customer = await Invoice.find().populate("customerId", "name")
        const product = await Invoice.find().populate("items.product", "name")
        //const invoices = {customer, product}
        res.status(200).json({
            customer,
            product
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al mostrar las facturas."
        })
    }
}

const postInvoice = async (req, res) => {

    try {
        
        const newInvoice = new Invoice(req.body)
        await newInvoice.save();
        res.status(201).json({
            msg: "Invoice added",
            newInvoice
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al generar la factura"
        })
    }

}

export {
    getInvoices,
    postInvoice
}