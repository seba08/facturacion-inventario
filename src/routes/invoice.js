import { Router } from "express";
import { getInvoices, postInvoice } from "../controllers/invoice.js";



const invoiceRouter = Router();


invoiceRouter.get("/:id", (req, res) => {
    res.send("Invoice y ID")
})
invoiceRouter.get("/", getInvoices)
invoiceRouter.post("/", postInvoice)
invoiceRouter.put("/:id", (req, res) => {
    res.send("Put Invoice")
})
invoiceRouter.delete("/:id", (req, res) => {
    res.send("Delete Invoice")
})

export default invoiceRouter;