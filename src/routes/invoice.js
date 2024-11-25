import { Router } from "express";



const invoiceRouter = Router();


invoiceRouter.get("/:id", (req, res) => {
    res.send("Invoice y ID")
})
invoiceRouter.get("/", (req, res) => {
    res.send("Get Invoices")
})
invoiceRouter.post("/", (req, res) => {
    res.send("Post Invoice")
})
invoiceRouter.put("/:id", (req, res) => {
    res.send("Put Invoice")
})
invoiceRouter.delete("/:id", (req, res) => {
    res.send("Delete Invoice")
})

export default invoiceRouter;