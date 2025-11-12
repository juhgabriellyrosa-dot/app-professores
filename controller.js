let professores = require('./app');

// Função auxiliar para encontrar o índice de um professor
const findProfessorIndex = (id) => professores.findIndex(p => p.id === id);

/**
 * Endpoint: GET /professores
 * Retorna todos os professores.
 */
exports.listarTodos = (req, res) => {
  res.status(200).json(professores);
};

/**
 * Endpoint: GET /professores/:id
 * Busca e retorna um professor por ID.
 */
exports.buscarPorId = (req, res) => {
  const { id } = req.params;
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Professor não encontrado." });
  }

  res.status(200).json(professor);
};

/**
 * Endpoint: GET /professores/:id/turmas
 * Lista todas as turmas de um professor específico.
 */
exports.listarTurmas = (req, res) => {
  const { id } = req.params;
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Professor não encontrado." });
  }

  res.status(200).json({
    professor: professor.nome,
    turmas: professor.turmas
  });
};

/**
 * Endpoint: PUT /professores/:id
 * Atualiza dados de um professor.
 */
exports.atualizarProfessor = (req, res) => {
  const { id } = req.params;
  const { nome, idade, departamento } = req.body;
  const professorIndex = findProfessorIndex(id);

  if (professorIndex === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  // Atualiza apenas os campos fornecidos
  if (nome) professores[professorIndex].nome = nome;
  if (idade) professores[professorIndex].idade = idade;
  if (departamento) professores[professorIndex].departamento = departamento;

  res.status(200).json({ 
    mensagem: "Professor atualizado com sucesso.",
    professor: professores[professorIndex]
  });
};

/**
 * Endpoint: POST /professores/:id/turmas
 * Adiciona uma nova turma para um professor.
 */
exports.adicionarTurma = (req, res) => {
  const { id } = req.params;
  const novaTurma = req.body; // Espera: { "codigo": "...", "disciplina": "...", "alunos": ["...", "..."] }
  const professorIndex = findProfessorIndex(id);

  if (professorIndex === -1) {
    return res.status(404).json({ mensagem: "Professor não encontrado." });
  }

  // Validação básica da nova turma
  if (!novaTurma.codigo || !novaTurma.disciplina) {
    return res.status(400).json({ mensagem: "Dados da turma incompletos (código e disciplina são obrigatórios)." });
  }

  // Adiciona a nova turma
  professores[professorIndex].turmas.push(novaTurma);

  res.status(201).json({
    mensagem: "Turma adicionada com sucesso.",
    turmas: professores[professorIndex].turmas
  });
};

/**
 * Endpoint: GET /professores/departamento/:departamento
 * Lista professores por departamento.
 */
exports.listarPorDepartamento = (req, res) => {
  const { departamento } = req.params;
  // O departamento é codificado na URL, é bom decodificá-lo
  const departamentoDecodificado = decodeURIComponent(departamento);

  const professoresPorDepto = professores.filter(
    p => p.departamento.toLowerCase() === departamentoDecodificado.toLowerCase()
  );

  if (professoresPorDepto.length === 0) {
    return res.status(404).json({ 
      mensagem: `Nenhum professor encontrado no departamento: ${departamentoDecodificado}`
    });
  }

  res.status(200).json(professoresPorDepto);
};

/**
 * Endpoint: DELETE /professores/:id
 * Remove um professor.
 */
exports.removerProfessor = (req, res) => {
  const { id } = req.params;
  const professorIndex = findProfessorIndex(id);

  if (professorIndex === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  // Remove o professor do array e atualiza o array
  professores = professores.filter(p => p.id !== id);

  res.status(200).json({ mensagem: `Professor com ID ${id} removido com sucesso.` });
};