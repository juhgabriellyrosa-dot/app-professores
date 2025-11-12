const express = require('express');
const router = express.Router();
const professorController = require('./controller');

// Rota base: /professores

// Listar todos os professores
router.get('/', professorController.listarTodos);

// Buscar um professor por ID
router.get('/:id', professorController.buscarPorId);

// Listar todas as turmas de um professor
router.get('/:id/turmas', professorController.listarTurmas);

// Listar professores por departamento
router.get('/departamento/:departamento', professorController.listarPorDepartamento);

// Atualizar dados de um professor
router.put('/:id', professorController.atualizarProfessor);

// Adicionar uma turma para um professor
router.post('/:id/turmas', professorController.adicionarTurma);

// Remover um professor
router.delete('/:id', professorController.removerProfessor);

module.exports = router;