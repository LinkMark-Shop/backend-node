const mariadb = require("mariadb");
require("dotenv").config({ path: ".env.local" });
// Configuração do pool de conexão
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Aumente o limite de conexões
  queueLimit: 0,
  // acquireTimeout: 30000, // Aumente o tempo limite para 30 segundos
});
async function createDatabaseAndTable() {
  let conn;
  try {
    // Conexão com o banco de dados
    conn = await pool.getConnection();

    // Criação do banco de dados
    await conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);

    // Selecionar o banco de dados
    await conn.query("USE ecommerce_db");

    // Criação da tabela de produtos
    await conn.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        stock INT DEFAULT 0,
        author VARCHAR(255),
        evaluation DECIMAL(3, 2),
        img VARCHAR(255)
      )
    `);

    console.log("Banco de dados e tabela criados com sucesso!");
  } catch (err) {
    console.error("Erro ao criar banco de dados e tabela:", err);
  } finally {
    if (conn) conn.end(); // Fecha a conexão
  }
}

createDatabaseAndTable();
