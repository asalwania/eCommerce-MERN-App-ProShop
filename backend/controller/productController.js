import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route    GET /api/products
// @access    Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// @desc    Fetch product by id
// @route    GET /api/products/:id
// @access    Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export { getProducts, getProductById };
