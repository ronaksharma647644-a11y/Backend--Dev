import validator from "validator";
import Review from "../models/Review.js";
import Product from "../models/product.js";
import { StatusCodes } from "http-status-codes";

function cleanInput(input) {
    return validator.escape(input);
}

export async function addReview(req, res) {
    try {
        const { productId, comment } = req.body;

        if (!productId || !comment) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                code: StatusCodes.BAD_REQUEST,
                message: "ProductId and comment required"
            });
        }

        if (!validator.isMongoId(productId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                code: StatusCodes.BAD_REQUEST,
                message: "Invalid productId format"
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({
                code: StatusCodes.NOT_FOUND,
                message: "Product not found"
            });
        }

        const newReview = new Review({
            productId,
            userId: req.session.userId,
            comment: cleanInput(comment)
        });

        const review = await newReview.save();
        res.status(StatusCodes.CREATED).json({
            code: StatusCodes.CREATED,
            message: "Review added successfully",
            data: review
        });
    } catch (err) {
        console.error("Review error:", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error"
        });
    }
}

export async function getReviews(req, res) {
    try {
        const { productId } = req.query;

        if (!productId) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                code: StatusCodes.BAD_REQUEST,
                message: "ProductId required"
            });
        }

        if (!validator.isMongoId(productId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                code: StatusCodes.BAD_REQUEST,
                message: "Invalid productId format"
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({
                code: StatusCodes.NOT_FOUND,
                message: "Product not found"
            });
        }

        const reviews = await Review.find({ productId });
        res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: "Reviews fetched",
            data: reviews
        });
    } catch (err) {
        console.error("Fetch error:", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error"
        });
    }
}