import { ImageFileCheckForUI, removefIle, upload } from "../helpers/multer.js";
import brandModel from "../models/brand.model.js";
import productModel from "../models/product.model.js";

class ProductServices {
    async add(req, res) {
        try {
            console.log(req.body,'req.bodyreq.bodyreq.body')
            let { title, description, brand_id, universal_standard_code } = req.body
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
                created_by: loginUser?.id
            }
            upload.array("images", 10)(req, res, async (err) => {
                if (err) {
                    console.log(err,'eeerr ')
                    return res.status(400).json({
                        message: "Error uploading images",
                        error: err.message,
                        success: false
                    });
                }
            })

            // ✅ Validate each uploaded file
            if (req.files && req.files?.length) {
                for (let el of req.files) {
                    let name = el?.filename;
                    let size = el?.size;
                    let get = await ImageFileCheckForUI(name, size);
                    if (get == "invalid file") {
                        try { removefIle(name) } catch (er) { console.log(er, "eoror in remove product imgae") }
                        return res.status(400).json({
                            message:
                                "Product image must be png or jpeg or webp file and size must be less than 500 kb",
                            statusCode: 400,
                            success: false,
                        });
                    }
                }
            } else {
                return res.status(400).json({
                    message: "Product image is mandatory",
                    success: false,
                    statusCode: 400,
                });
            }
            await productModel.create(obj)
        } catch (error) {
            console.log(error,"eeeeee")
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
}
const productServiceObj = new ProductServices()
export default productServiceObj