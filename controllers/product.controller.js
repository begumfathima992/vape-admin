import { ImageFileCheckForUI } from "../helpers/multer.js";
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
            console.log(req.files, "wwwwwwwwwwwwwwww")
            // return
            if (req.files && req.files?.images?.length) {
                for (let le of req.files.images) {
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

            await productServiceObj.add(req, res)
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
}
export const productControllerObj = new ProductController()
