import { Router } from "express";
import { deleteCategory, getCategories, getCategory, postCategory, putCategory } from "../controllers/category.js";



const categoryRouter = Router();


categoryRouter.get("/:id", getCategory)
categoryRouter.get("/", getCategories)
categoryRouter.post("/", postCategory)
categoryRouter.put("/:id", putCategory)
categoryRouter.delete("/:id", deleteCategory)

export default categoryRouter;