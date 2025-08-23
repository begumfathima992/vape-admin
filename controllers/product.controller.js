import { ImageFileCheckForUI, removefIle } from "../helpers/multer.js";
import { addProductchema } from "../helpers/validator/product.validator.js";
import productServiceObj from "../services/product.services.js";

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
};
class ProductController {

    async add(req, res) {
        try {
            let { error } = addProductchema.validate(req?.body, options);
            if (error) {
                return res
                    .status(400)
                    .json({ message: error.details[0]?.message, success: false });
            }
            // console.log(req.files, "wwwwwwwwwwwwwwww")
            // return
            
            let checkStatusOfImage = []
            if (req.files && req.files?.length) {
                for (let el of req.files) {
                    let name = `${req.body.title}/${el?.filename?.replace(/\s+/g, "_")}`;
                    let size = el?.size;

                    let get = await ImageFileCheckForUI(`${name}`, size);
                    // console.log(get, "gggggg")

                    if (get == "invalid file") {
                        checkStatusOfImage.push(el?.filename)
                    }
                }
            } else {
                return res.status(400).json({
                    message: "Product image is mandatory",
                    success: false,
                    statusCode: 400,
                });
            }
            if (checkStatusOfImage && checkStatusOfImage?.length > 0) {
                return res.status(400).json({
                    message:
                        `This Product image : "${checkStatusOfImage?.toString()}" must be PNG or JPEG or WEBP file and SIZE must be less than 500 kb`,
                    statusCode: 400,
                    success: false,
                });
            }
            // return
            await productServiceObj.add(req, res)
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
}
export const productControllerObj = new ProductController()
