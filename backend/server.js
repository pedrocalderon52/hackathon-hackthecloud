const express = require('express');
const cors = require('cors');
const tarefaRoutes = require('./src/routes/tarefaRoutes');
const provaRoutes = require('./src/routes/provaRoutes');
const blocoRoutes = require('./src/routes/blocoRoutes');
const semanaRoutes = require('./src/routes/semanaRoutes');
const disciplinaRoutes = require('./src/routes/disciplinaRoutes');
const recommendationRoutes = require('./src/routes/recommendationRoutes');
const diaRoutes = require('./src/routes/diaRoutes');
const setupRoutes = require('./src/routes/setupRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:8080' }));
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
