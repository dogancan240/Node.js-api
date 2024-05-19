const { getRepository } = require("typeorm");
const Product = require("../models/product");
const Package = require("../models/package");

const getProducts = async (req, res) => {
  try {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productRepository = getRepository(Product);
    const product = await productRepository.findOneBy({
      id: id, // where id is your column name
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const productRepository = getRepository(Product);
    const product = productRepository.create(req.body);
    const result = await productRepository.save(product);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productRepository = getRepository(Product);
    const existingProduct = await productRepository.findOneBy({
      id: id, // where id is your column name
    });
    if (existingProduct) {
      productRepository.merge(existingProduct, req.body);
      const result = await productRepository.save(existingProduct);
      res.json(result);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productRepository = getRepository(Product);
    const result = await productRepository.delete(id);
    if (result.affected === 0) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addPackageToProduct = async (req, res) => {
  try {
    const { productId, packageId } = req.body;

    // Retrieve product and package entities
    const productRepository = getRepository(Product);
    const packageRepository = getRepository(Package);
    const product = await productRepository.findOneBy({
      id: productId, // where id is your column name
    });
    const package = await packageRepository.findOneBy({
      id: packageId, // where id is your column name
    });

    if (!product || !package) {
      return res.status(404).json({ message: "Product or package not found" });
    }

    if (!product.packages) {
      product.packages = [];
    }

    // Associate the package with the product
    product.packages.push(package);

    // Save the changes to the database
    await productRepository.save(product);

    res.json({ message: "Package added to product successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addPackageToProduct,
};
