import {products} from './constants/data.js';
 import product from './model/product-schema.js';
const DefaultData = async() =>{
    try {
           await product.deleteMany({}); // Clear existing data
           await product.insertMany(products);
            console.log('Default data inserted successfully');
        
    } catch (error) {
        console.error('Error while  inserting default data:', error.message);
    }
}
  export default DefaultData;