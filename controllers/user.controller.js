import { USerLoginSchema, UserSchema } from "../helpers/validator/user.validator.js";
import productServiceObj from "../services/product.services.js";
import { UserServiceObj } from "../services/user.services.js";

const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

class UserController {
    
    async register(req, res) {
        try {
            let { error } = UserSchema.validate(req.body, options)
            if (error) {
                return res.status(400).json({ message: error?.details[0]?.message, statusCode: 400, success: false })
            }
            await UserServiceObj.regsiter(req, res)
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }


    async login(req, res) {
        try {
            // console.log("first", req.body)
            // joi validation
            let { error } = USerLoginSchema.validate(req.body, options)
            if (error) {
                return res.status(400).json({ message: error.details[0]?.message, statusCode: 400 })
            }

            await UserServiceObj.login(req, res)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
    async logout(req, res) {
        try {
            await UserServiceObj.logout(req, res)
        } catch (error) {
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }
}
export const UserControllerObj = new UserController()
