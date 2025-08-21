import express from 'express'
import dotenv from 'dotenv'
import { environmentVar } from './config/environmentVariable.js'
import UserRoutes from './routes/user.routes.js';
import ProductRoutes from './routes/product.routes.js';
import BrandRoutes from './routes/brand.routes.js';

dotenv.config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/success", (req, res) => {
    return res.status(200).json({ message: "succcess message", statusCode: 200, success: true })
});

app.use("/user",UserRoutes)
app.use("/product",ProductRoutes)
app.use("/brand",BrandRoutes)

app.listen(environmentVar.PORT, (err, resolve) => {
    console.log(`success listening to port : ${environmentVar.PORT}`)
});