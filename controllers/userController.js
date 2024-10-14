const bcrypt = require("bcrypt");
const User = require("../models/user");

// Função para cadastrar usuário
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    // Criação do usuário
    const newUser = await User.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.message);
    if (error.message === "Email já cadastrado") {
      return res.status(400).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erro ao cadastrar usuário", error: error.toString() });
  }
};

// Função para fazer login do usuário
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Comparar senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    res.status(200).json({ message: "Login bem-sucedido" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao fazer login", error: error.message });
  }
};

// Função para atualizar dados do usuário
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const result = await User.update(id, updates);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar usuário", error: error.message });
  }
};

// Função para deletar usuário
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await User.delete(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar usuário", error: error.message });
  }
};
