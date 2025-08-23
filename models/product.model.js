import { Sequelize, DataTypes } from 'sequelize'
import dbconnection from '../config/dbconfig.js'

const productModel = dbconnection.define(
    'product', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, unique: true },
    title: { type: DataTypes.STRING, required: true },
    brand_id: { type: DataTypes.STRING, required: true },
    description: { type: DataTypes.STRING, required: true },
    images: { type: DataTypes.JSON, required: false, allowNull: true },
    images: { type: DataTypes.JSON, required: false, defaultValue: 10 },
    minimum_order_quantity: { type: DataTypes.BIGINT, required: false, defaultValue: 3 },
    quantity: { type: DataTypes.BIGINT, required: false, defaultValue: 10 },
    
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
    },
    is_deleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    created_by: {
        type: DataTypes.BIGINT,
        alllowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, { timestamps: false, tableName: 'product' }
)
export default productModel