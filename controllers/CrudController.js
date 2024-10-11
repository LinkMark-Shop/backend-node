const Product = require('../models/product');

// CREATE
exports.createProduct = async (req, res) => {
    const { name, price, description, stock, author, evaluation, img } = req.body;

    // Validação simples
    if (!name || !price || !description) {
        return res.status(400).json({ message: "Nome, preço e descrição são obrigatórios" });
    }

    try {
        const newProduct = await Product.create(req.body); 
        res.status(201).json(newProduct); 
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Erro ao criar produto" });
    }
};

// READ - Listar todos os produtos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Erro ao buscar produtos" });
    }
};

// READ - Buscar produto por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Erro ao buscar produto" });
    }
};

// READ - Buscar produto por nome
exports.searchProductByName = async (req, res) => {
    const { name } = req.query;
    if (!name || name.length < 3) {
        return res.status(400).json({ message: "Nome de produto é necessário e deve ter pelo menos 3 caracteres" });
    }

    try {
        const products = await Product.getByName(name);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Erro ao buscar produtos" });
    }
};

// UPDATE
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
        res.status(500).json({ error: error.message, message: "Erro ao atualizar produto" });
    }
};

// DELETE
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Product.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Erro ao deletar produto" });
    }
};
