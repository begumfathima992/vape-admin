import express from 'express'
import { upload, upload_brand } from '../helpers/multer.js'
import { BrandControllerObj } from '../controllers/brand.controller.js'

const BrandRoutes = express.Router()

BrandRoutes.post('/add', upload_brand.array("images", 10),BrandControllerObj.add)

export default BrandRoutes