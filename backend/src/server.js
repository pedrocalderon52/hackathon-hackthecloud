// src/server.js
const express = require('express');
const tarefaRoutes = require('./routes/tarefaRoutes');
const provaRoutes = require('./routes/provaRoutes');
const blocoRoutes = require('./routes/blocoRoutes');
const semanaRoutes = require('./routes/semanaRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const diaRoutes = require('./routes/diaRoutes');
const setupRoutes = require('./routes/setupRoutes');

const app = express();

app.use(express.json());

app.use('/tarefas', tarefaRoutes);
app.use('/provas', provaRoutes);
app.use('/blocos', blocoRoutes);
app.use('/semanas', semanaRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/recomendacoes', recommendationRoutes);
app.use('/dias', diaRoutes);
app.use('/', setupRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
