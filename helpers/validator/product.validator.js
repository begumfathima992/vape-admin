import Joi from "joi";

export const addProductchema = Joi.object({
    title: Joi.string().min(3).max(50).trim().required().label("Title"),
    brand_id: Joi.string().max(50).trim().required().label("brand_id"),
    description: Joi.string()
        .min(10)
        .max(3000)
        .trim()
        .required()
        .label("description"),
})