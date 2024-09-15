require("dotenv").config();
require("dotenv").config({ path: ".env.local" });
const express = require("express");
const cors = require("cors");
const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Permitir apenas uma origem específica
    methods: "GET,POST,PUT,DELETE", // Métodos permitidos
    allowedHeaders: "Content-Type,Authorization", // Cabeçalhos permitidos
  })
);

const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes");
// const authorRoutes = require("./routes/authorRoutes");

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
