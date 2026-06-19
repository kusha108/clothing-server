import axios from "axios";
import fs from "fs";
import FormData from "form-data";

import Product from "../../model/product-schema.js";

export const analyzeUserImage = async (req, res) => {
  try {
    // ✅ SAFETY CHECK
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // ✅ SEND IMAGE TO AI SERVICE
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    const response = await axios.post(
      "http://127.0.0.1:8001/analyze",
      formData,
      { headers: formData.getHeaders() }
    );

    const aiData = response.data;

    const userGender = req.body.gender || aiData.gender || "male";

    let matchedProducts = [];

    // 🔥 STEP 1: CATEGORY BASED MATCH WITH FALLBACK
    for (let rec of aiData.recommendations) {
      let products = await Product.aggregate([
        {
          $match: {
            category: rec.category,
            gender: userGender
          }
        },
        { $sample: { size: 2 } }
      ]);

      // 🔥 IF NO MATCH → fallback to any category (same gender)
      if (products.length === 0) {
        products = await Product.aggregate([
          {
            $match: {
              gender: userGender
            }
          },
          { $sample: { size: 2 } }
        ]);
      }

      matchedProducts.push(...products);
    }

    // 🔥 STEP 2: ADD FULL OUTFIT (SHOES, CAPS, ETC.)
    const extraProducts = await Product.aggregate([
      {
        $match: {
          gender: userGender
        }
      },
      { $sample: { size: 6 } }
    ]);

    matchedProducts = [...matchedProducts, ...extraProducts];

    // 🔥 STEP 3: REMOVE DUPLICATES
    const uniqueProducts = [];
    const ids = new Set();

    for (let item of matchedProducts) {
      if (!ids.has(item._id.toString())) {
        uniqueProducts.push(item);
        ids.add(item._id.toString());
      }
    }

    matchedProducts = uniqueProducts;

    // 🔥 STEP 4: FINAL FALLBACK
    if (matchedProducts.length === 0) {
      matchedProducts = await Product.aggregate([
        {
          $match: {
            gender: userGender
          }
        },
        { $sample: { size: 10 } }
      ]);
    }

    // ✅ FINAL RESPONSE
    res.json({
      ...aiData,
      products: matchedProducts,
    });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI failed" });
  }
};