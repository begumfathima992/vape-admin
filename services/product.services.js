import { ImageFileCheckForUI, removefIle, upload } from "../helpers/multer.js";
import brandModel from "../models/brand.model.js";
import productModel from "../models/product.model.js";

class ProductServices {
    async add(req, res) {
        try {
            console.log(req.body, 'req.bodyreq.bodyreq.body')
            let { title, description, brand_id, universal_standard_code,minimum_order_quantity,quantity } = req.body
            let loginUser = req.userData

            // check brand
            let findBrand = await brandModel.findOne({ where: { id: brand_id }, raw: true, attributes: ['id'] })
            if (!findBrand) {
                return res.status(400).json({ message: "Brand not exist", statusCode: 400, success: false })
            }

            //check product name exist
            let findProduct = await productModel?.findOne({ where: { title: title }, raw: true, attributes: ['id'] })
            if (findProduct && findProduct?.id) {
                return res.status(400).json({ message: `This Product title : ${title} already existed`, statusCode: 400, success: false })
            }
            let obj = {
                title,
                description,
                brand_id,
                universal_standard_code,
                created_by: loginUser?.id,
                minimum_order_quantity, quantity
            }
            let images = []
            if (req.files && req.files?.length) {
                for (let el of req.files) {
                    let name = `${title}/${el?.filename?.replace(/\s+/g, "_")}`;
                    images.push(name)
                }
            }
            obj.images = images

            await productModel.create(obj)
            return res.status(201).json({ message: "Product Added Success", statusCode: 201, success: true })
        } catch (error) {
            console.log(error, "eeeeee")
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
    async get(req, res) {
        try {

        } catch (er) {
            console.log(er, "get in prodct")
            return
        }
    }
}
const productServiceObj = new ProductServices()
export default productServiceObj