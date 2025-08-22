import express from 'express'
import { upload } from '../helpers/multer.js'
import { productControllerObj } from '../controllers/product.controller.js'
import { authorize } from '../helpers/auth.js'

const ProductRoutes = express.Router()

ProductRoutes.post('/add', upload.array("images", 10), productControllerObj.add)

ProductRoutes.put('/edit', authorize, upload.array("images", 10), productControllerObj.add)
ProductRoutes.get('/get', authorize, productControllerObj.add)
// ProductRoutes.patch('/status_change', authorize, productControllerObj.add)
// ProductRoutes.delete('/delete_product', authorize, productControllerObj.add)

export default ProductRoutes