require("dotenv").config();
require("dotenv").config({ path: ".env.local" });
const express = require("express");
const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes");
// const authorRoutes = require("./routes/authorRoutes");

const app = express();
app.use(express.json());

// Rotas
app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/authors", authorRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
