const pool = require('../config/db');

const Product = {
    // READ - Buscar todos os produtos
    getAll: async () => {
        const results = await pool.query("SELECT * FROM products");
        return results;
    },

    // READ - Buscar produto por ID
    getById: async (id) => {
        const [result] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
        return result;
    },

    // READ - Buscar produto por nome
    getByName: async (name) => {
        const results = await pool.query("SELECT * FROM products WHERE name LIKE ?", [`%${name}%`]);
        return results;
    },

    // CREATE
    create: async (product) => {
        const { name, price, description, stock, author, evaluation, img } = product;
        const result = await pool.query(
            `INSERT INTO products (name, price, description, stock, author, evaluation, img) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, price, description, stock, author, evaluation, img]
        );
        return result;
    },

    // UPDATE
    update: async (id, updates) => {
        const setClause = Object.keys(updates)
            .map(key => `${key} = ?`)
            .join(", ");
        const values = Object.values(updates);
        values.push(id);

        const query = `UPDATE products SET ${setClause} WHERE id = ?`;
        const result = await pool.query(query, values);
        return result;
    },

    // DELETE
    delete: async (id) => {
        const result = await pool.query("DELETE FROM products WHERE id = ?", [id]);
        return result;
    }
};

module.exports = Product;
