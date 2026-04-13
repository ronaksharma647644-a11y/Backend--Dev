import { StatusCodes } from "http-status-codes";
import Product from "../models/product.js";

export async function addProduct(req, res) {
    try {
        const { name, price } = req.body;
        if (!name || price === undefined || price < 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                code: StatusCodes.BAD_REQUEST,
                message: "Name and price are required, and price must be non-negative"
            });
        }

        const product = await new Product({ name, price }).save();
        res.status(StatusCodes.CREATED).json({
            code: StatusCodes.CREATED,
            message: "Product added successfully",
            data: product
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            data: null
        });
    }
}

export async function searchProducts(req, res) {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                code: StatusCodes.BAD_REQUEST,
                message: "Name query parameter is required"
            });
        }

        const products = await Product.find({ name: { $regex: name, $options: "i" } });
        res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: "Products retrieved successfully",
            data: products
        });
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            data: null
        });
    }
}