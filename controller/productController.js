const Product = require("../models/productModel");
const { getPostData } = require("../utils");

// @desc    Get All products
// @route   GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(`💥💥 ERROR: ${error}`);
  }
}

// @desc    Get single product
// @route   GET /api/products/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "Products Not Found" }));
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(`💥💥 ERROR: ${error}`);
  }
}

// @desc    Create a product
// @route   POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);

    const product = {
      name,
      description,
      price,
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(`💥💥 ERROR: ${error}`);
  }
}

// @desc    Update a product
// @route   PUT /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "Products Not Found" }));
    } else {
      const body = await getPostData(req);

      const { name, description, price } = JSON.parse(body);

      const productData = {
        name: name || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updProduct = await Product.update(id, productData);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log(`💥💥 ERROR: ${error}`);
  }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "Products Not Found" }));
    } else {
      await Product.delete(id);

      res.writeHead(204);
      res.end();
    }
  } catch (error) {
    console.log(`💥💥 ERROR: ${error}`);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
