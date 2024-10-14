const pool = require('../config/db');

const User = {
    // CREATE - Cadastro de usuário
    create: async (user) => {
        const { username, email, password } = user;

        // Verificar se o e-mail já existe
        const existingUser = await User.getByEmail(email);
        if (existingUser) {
            throw new Error("Email já cadastrado");
        }

        // Inserir o novo usuário
        const result = await pool.query(
            `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
            [username, email, password]
        );

        // Retornar o novo usuário com o ID convertido para número
        return { id: Number(result.insertId), username, email };
    },

    // READ - Buscar usuário por email (para login)
    getByEmail: async (email) => {
        const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        return result;
    },

    // UPDATE - Atualizar dados do usuário
    update: async (id, updates) => {
        const setClause = Object.keys(updates)
            .map(key => `${key} = ?`)
            .join(", ");
        const values = Object.values(updates);
        values.push(id);

        const query = `UPDATE users SET ${setClause} WHERE id = ?`;
        const result = await pool.query(query, values);
        return result;
    },

    // DELETE - Deletar usuário
    delete: async (id) => {
        const result = await pool.query("DELETE FROM users WHERE id = ?", [id]);
        return result;
    }
};

module.exports = User;
