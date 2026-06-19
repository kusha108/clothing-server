import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: String,
    url: String,
    detailUrl: String,

    title: {
        shortTitle: String,
        longTitle: String
    },

    price: {
        mrp: Number,
        cost: Number,
        discount: String
    },

    quantity: Number,
    description: String,
    discount: String,
    tagline: String,

    // EXISTING
    category: {
        type: String,
        required: true
    },

    //  NEW: GENDER SUPPORT (VERY IMPORTANT)
    gender: {
        type: String,
        enum: ["male", "female", "unisex"],
        default: "unisex"
    },

    //  STYLE (already added, keep)
    style: {
        type: String,
        default: "fitted"
    },

    //  COLOR (already added, keep)
    color: {
        type: String,
        default: "black"
    }
});

const product = mongoose.model('products', productSchema);

export default product;