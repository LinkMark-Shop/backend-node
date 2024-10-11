const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CREATE - Cadastro de usuário
router.post('/register', userController.registerUser);

// READ - Login de usuário
router.post('/login', userController.loginUser);

// UPDATE - Atualizar dados do usuário
router.put('/:id', userController.updateUser);

// DELETE - Deletar usuário
router.delete('/:id', userController.deleteUser);

module.exports = router;

