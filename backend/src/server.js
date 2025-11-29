// src/server.js
const express = require('express');
const tarefaRoutes = require('./routes/tarefaRoutes');
const provaRoutes = require('./routes/provaRoutes');
const blocoRoutes = require('./routes/blocoRoutes');
const semanaRoutes = require('./routes/semanaRoutes');

const app = express();

app.use(express.json());

app.use('/tarefas', tarefaRoutes);
app.use('/provas', provaRoutes);
app.use('/blocos', blocoRoutes);
app.use('/semanas', semanaRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
