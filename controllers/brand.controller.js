import { ImageFileCheckForUI } from "../helpers/multer.js";
import { addBrandchema } from "../helpers/validator/brand.validator.js";
import BrandServiceObj from "../services/brand.services.js";

const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

class BrandController {
    async add(req, res) {
        try {
            let { error } = addBrandchema.validate(req?.body, options);
            if (error) {
                return res
                    .status(400)
                    .json({ message: error.details[0]?.message, success: false });
            }

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
            }

            await BrandServiceObj.add(req, res)
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
}
export const BrandControllerObj = new BrandController()
