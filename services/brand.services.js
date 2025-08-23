import { removefIle } from "../helpers/multer.js";
import brandModel from "../models/brand.model.js";

class BrandServices {
    async add(req, res) {
        try {
            let { title, description, parent_id } = req.body
            let loginUser = req.userData

            // check brand
            let findBrand = await brandModel.findOne({ where: { title }, raw: true, attributes: ['id'] })
            if (findBrand) {
                if (req.files && req.files?.length) {
                    for (let el of req.files) {
                        let name = `${title}/${el?.filename?.replace(/\s+/g, "_")}`;
                        await removefIle(name, 'brands')
                    }
                }
                return res.status(400).json({ message: `This Brand "${title}" exist`, statusCode: 400, success: false })
            }
            // parent_id
            if (parent_id) {
                let fetch_parent = await brandModel.findOne({ where: { id: parent_id }, raw: true })
                if (!fetch_parent) {
                    if (req.files && req.files?.length) {
                        for (let el of req.files) {
                            let name = `${title}/${el?.filename?.replace(/\s+/g, "_")}`;
                            await removefIle(name, 'brands')
                        }
                    }
                    return res.status(400).json({ message: `This Brand id "${parent_id}" is not exist`, statusCode: 400, success: false })
                }
            }
            let obj = {
                title,
                description,
                created_by: loginUser?.id,
                parent_id
            }
            let images = []
            if (req.files && req.files?.length) {
                for (let el of req.files) {
                    let name = `${title}/${el?.filename?.replace(/\s+/g, "_")}`;
                    images.push(name)
                }
            }
            obj.images = images


            await brandModel.create(obj)
            return res.status(201).json({ message: 'Brand Added Success', statusCode: 201, success: true })
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
}
const BrandServiceObj = new BrandServices()
export default BrandServiceObj