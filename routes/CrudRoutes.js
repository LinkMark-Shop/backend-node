const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// CREATE
router.post('/create', productController.createProduct);

// READ
router.get('/', productController.getProducts); // Listar todos os produtos
router.get('/:id', productController.getProductById); // Buscar produto por ID
router.get('/search', productController.searchProductByName); // Buscar produto por nome

// UPDATE
router.put('/:id', productController.updateProduct); // Atualizar produto

// DELETE
router.delete('/:id', productController.deleteProduct); // Deletar produto

module.exports = router;
