import Joi from "joi";

export const addProductchema = Joi.object({
    title: Joi.string().min(3).max(50).trim().required().label("Title"),
    brand_id: Joi.string().max(50).trim().required().label("brand_id"),
    minimum_order_quantity: Joi.number().required().label("minimum_order_quantity"),
    quantity: Joi.number().required().label("quantity"),
    description: Joi.string()
        .min(10)
        .max(3000)
        .trim()
        .required()
        .label("description"),

})