const products = require("../data/products.json");
const { v4: uuid4 } = require("uuid");
const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => resolve(products));
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuid4(), ...product };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };
    writeDataToFile("./data/products.json", products);
    resolve(products[index]);
  });
}

function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    const newProducts = products.filter((p) => p.id !== id);
    writeDataToFile("./data/products.json", newProducts);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteProduct,
};
