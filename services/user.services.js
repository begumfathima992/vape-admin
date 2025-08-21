import userModel from "../models/user.model.js";

class User {

    // generateAccessTok
    async login(req, res) {
        try {
            // console.log("first", req.body)

            let { phone_number, password } = req.body

            let find = await userModel.findOne({ where: { phone_number }, raw: true })
            // console.log(find, "findEmailfindEmail")

            if (!find) {
                return res.status(400).json({ message: "User not found, kindly register first", success: false, statusCode: 400 })
            }
            // console.log(find, "findemali")
            let checkpassword = await bcrypt.compare(password, find?.password);
            // console.log(checkpassword, "checkpassword ")

            if (!checkpassword) {
                res.status(400).json({ message: "Password is not valid", success: false, statusCode: 400 })
                return;
            }

            delete find.password
            delete find.access_token
            let generateToken = generateAccessToken(find)
            let access_token = generateAccessToken(find)

            await userModel?.update({ access_token: access_token }, { where: { id: find?.id } })

            find.token = generateToken
            find.access_token = access_token

            return res.status(200).json({ mesage: "Login Success", data: find, statusCode: 200, success: true })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
        }
    }


    async logout(req, res) {
        try {
            let user_obj = req.userData
            let findUSer = await userModel?.findOne({ where: { id: user_obj?.id } })
            if (!findUSer) {
                return res.status(400).json({ message: "user not found" })
            }
            await userModel?.update({ access_token: null }, { where: { id: user_obj?.id } })
            return res.status(200).json({ message: "logout success" })
        }
        catch (error) {
            console.log(error, "errorerror")
            return res.status(500).json({ message: error?.message })
        }
    }
}
export const UserServiceObj = new User()
