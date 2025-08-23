import { ImageFileCheckForUI, removefIle } from "../helpers/multer.js";
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

            let checkStatusOfImage = []
            let validFileName = []

            if (req.files && req.files?.length) {
                for (let el of req.files) {
                    let name = `${req.body.title}/${el?.filename?.replace(/\s+/g, "_")}`;

                    let size = el?.size;
                    let get = await ImageFileCheckForUI(`${name}`, size, 'brands');

                    if (get == "invalid file") {
                        checkStatusOfImage.push(el?.filename)
                    } else {
                        validFileName.push(name)
                    }
                }
            }
            if (checkStatusOfImage && checkStatusOfImage?.length > 0) {
                if (validFileName && validFileName?.length) {
                    for (let le of validFileName) {
                        await removefIle(le, 'brands')
                    }
                }
                return res.status(400).json({
                    message:
                        `This Brand image : "${checkStatusOfImage?.toString()}" must be PNG or JPEG or WEBP file and SIZE must be less than 500 kb`,
                    statusCode: 400,
                    success: false,
                });
            }
            await BrandServiceObj.add(req, res)
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
}
export const BrandControllerObj = new BrandController()
