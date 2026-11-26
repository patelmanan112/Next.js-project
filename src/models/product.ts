import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            trim: true,
        },
        description: {
            type: String,
        },
        rating : {
            type : Number
        }
    },
    {
        timestamps: true,
    },
);

const product = mongoose.models.Product || mongoose.model("product", productSchema);

export default product;