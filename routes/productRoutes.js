const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductsByName,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.get("/search", searchProductsByName);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Rota para buscar produtos por nome

module.exports = router;
