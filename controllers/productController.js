const Product = require("../models/product");

const serializeBigInt = (value) => {
  if (typeof value === "bigint") return value.toString();
  if (Array.isArray(value)) return value.map(serializeBigInt);
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, serializeBigInt(val)])
    );
  }
  return value;
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json(serializeBigInt(products));
  } catch (error) {
    res.status(500).json({ error: error, message: "Erro ao buscar produtos" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json(serializeBigInt(product));
  } catch (error) {
    res.status(500).json({ error: error, message: "Erro ao buscar produto" });
  }
};

exports.searchProductsByName = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ message: "Nome do produto é necessário" });
  }

  try {
    const products = await Product.getByName(name);
    res.status(200).json(serializeBigInt(products));
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Erro ao buscar produtos" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(serializeBigInt(newProduct));
  } catch (error) {
    res.status(500).json({ error: error, message: "Erro ao criar produto" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const result = await Product.update(id, updates);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json({ message: "Produto atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Erro ao atualizar produto" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const result = await Product.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error, message: "Erro ao deletar produto" });
  }
};
