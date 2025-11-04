
import express from "express";
import { addProduct, listproduct, removeProduct, singleProduct } from '../controllers/productController.js'
import upload from "../middleware/multer.js";
import adminAuthendicate from "../middleware/adminAuthMiddleware.js";

const productRoute = express.Router()


productRoute.post('/add',adminAuthendicate,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
productRoute.get('/allproduct', listproduct)
productRoute.post('/remove',adminAuthendicate, removeProduct)
productRoute.post('/single', singleProduct)

export default productRoute;


