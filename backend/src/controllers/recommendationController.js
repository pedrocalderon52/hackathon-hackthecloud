const prisma = require('../prismaClient');
const { buildRecommendations, generateSuggestion } = require('../utils/generateSuggestion');

const getWeeklyRecommendations = async (req, res) => {
  try {
    const semanaId = Number(req.params.semanaId);
    const dataAtual = new Date();

    const [tarefas, provas, blocos] = await Promise.all([
      prisma.tarefa.findMany({ where: { semanaId } }),
      prisma.prova.findMany({ where: { semanaId } }),
      prisma.grayBlock.findMany({ where: { semanaId } }),
    ]);

    const cards = buildRecommendations({ tasks: tarefas, provas, dataAtual });
    const moveSuggestion = generateSuggestion({ tasks: tarefas, blocks: blocos, dataAtual });

    res.json({
      semanaId,
      recommendations: cards,
      moveSuggestion,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getWeeklyRecommendations };
