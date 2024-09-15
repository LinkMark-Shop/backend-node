const pool = require("../config/db");

const Product = {
  getAll: async () => {
    const results = await pool.query("SELECT * FROM products");
    // Conversão de BigInt para string, se necessário
    return results.map((row) => {
      return Object.fromEntries(
        Object.entries(row).map(([key, val]) => [
          key,
          typeof val === "bigint" ? val.toString() : val,
        ])
      );
    });
  },

  getById: async (id) => {
    const [result] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    if (result) {
      return Object.fromEntries(
        Object.entries(result).map(([key, val]) => [
          key,
          typeof val === "bigint" ? val.toString() : val,
        ])
      );
    }
    return result;
  },

  getByName: async (name) => {
    if (name.length >= 3) {
      const results = await pool.query(
        "SELECT * FROM products WHERE name LIKE ?",
        [`%${name}%`] // Busca por nomes que contêm a string fornecida
      );
      return results.map((row) => {
        return Object.fromEntries(
          Object.entries(row).map(([key, val]) => [
            key,
            typeof val === "bigint" ? val.toString() : val,
          ])
        );
      });
    }
    return null;
  },

  create: async (product) => {
    const { name, price, description, stock, author, evaluation, img } =
      product;
    return await pool.query(
      "INSERT INTO products (name, price, description, stock, author, evaluation, img) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, price, description, stock, author, evaluation, img]
    );
  },

  update: async (id, updates) => {
    // Construa uma query dinâmica para atualizar apenas os campos fornecidos
    const setClause = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = Object.values(updates);

    // Adicione o ID ao final dos valores para a cláusula WHERE
    values.push(id);

    const query = `UPDATE products SET ${setClause} WHERE id = ?`;

    const [result] = await pool.query(query, values);
    return result;
  },

  delete: async (id) => {
    return await pool.query("DELETE FROM products WHERE id = ?", [id]);
  },
};

module.exports = Product;
