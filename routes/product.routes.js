import express from 'express'
import { upload } from '../helpers/multer.js'
import { productControllerObj } from '../controllers/product.controller.js'

const ProductRoutes = express.Router()

ProductRoutes.post('/add', upload.array("images", 10),productControllerObj.add)

export default ProductRoutes