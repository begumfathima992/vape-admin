import Joi from "joi";

export const addBrandchema = Joi.object({
    title: Joi.string().min(3).max(50).trim().required().label("Title"),
    description: Joi.string()
        .min(10)
        .max(3000)
        .trim()
        .required()
        .label("description"),
})