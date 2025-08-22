import express from 'express'
import { upload } from '../helpers/multer.js'
import { UserControllerObj } from '../controllers/user.controller.js'
import { authorize } from '../helpers/auth.js'

const UserRoutes = express.Router()

UserRoutes.post("/register", UserControllerObj.register)
UserRoutes.post('/login',UserControllerObj.login)
UserRoutes.post('/logout',authorize, UserControllerObj.logout)

export default UserRoutes