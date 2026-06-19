import Product from '../model/product-schema.js';


// GET ALL PRODUCTS

export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({});
        response.json(products);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}


// ---------------------------------------------
// GET PRODUCT BY ID
// ---------------------------------------------
export const getProductById = async (request, response) => {
    try {
        const id = request.params.id;
        const product = await Product.findOne({ id: id });

        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}


// ---------------------------------------------
//  NEW: GET PRODUCTS BY CATEGORY
// ---------------------------------------------
// Example: GET → /products/category/tshirts
// Example: GET → /products/category/joggers
// ---------------------------------------------
export const getProductsByCategory = async (request, response) => {
    try {
        const category = request.params.category;

        const products = await Product.find({ category: category });

        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
