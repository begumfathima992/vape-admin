import express from 'express'
import { upload } from '../helpers/multer.js'
import { BrandControllerObj } from '../controllers/brand.controller.js'

const BrandRoutes = express.Router()

BrandRoutes.post('/add', upload.array("images", 10),BrandControllerObj.add)

export default BrandRoutes