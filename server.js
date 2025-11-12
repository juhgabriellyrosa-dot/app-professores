const express = require('express');
const bodyParser = require('body-parser');
const professorRoutes = require('./Routes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Rota e Controller específica para professores: "/professores"
app.use('/professores', professorRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});