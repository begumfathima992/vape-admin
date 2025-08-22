import brandModel from "../models/brand.model.js";

class BrandServices {
    async add(req, res) {
        try {
            let { title, description } = req.body
            let loginUser = req.userData

            // check brand
            let findBrand = await brandModel.findOne({ where: { title }, raw: true, attributes: ['id'] })
            if (findBrand) {
                return res.status(400).json({ message: `This Brand "${title}" exist`, statusCode: 400, success: false })
            }
            let obj = {
                title,
                description,
                created_by: loginUser?.id
            }
            await brandModel.create(obj)
            return res.status(201).json({ message: 'Brand Added Success', statusCode: 201, success: true })
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
}
const BrandServiceObj = new BrandServices()
export default BrandServiceObj