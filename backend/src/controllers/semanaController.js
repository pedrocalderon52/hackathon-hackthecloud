// src/controllers/semanaController.js
const prisma = require('../prismaClient');
const calculateICS = require('../utils/calculateICS');

const listarEventos = async (req, res) => {
  try {
    const { semanaId } = req.params;
    const eventos = await prisma.evento.findMany({
      where: { semanaId: Number(semanaId) },
      orderBy: [{ dataInicio: 'asc' }],
    });
    res.json({ eventos });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const calcularICS = async (req, res) => {
  try {
    const { semanaId } = req.params;
    const semanaIdNum = Number(semanaId);
    const [tarefas, provas, agendamentos] = await Promise.all([
      prisma.tarefa.findMany({ where: { semanaId: semanaIdNum } }),
      prisma.prova.findMany({ where: { semanaId: semanaIdNum } }),
      prisma.evento.findMany({ where: { semanaId: semanaIdNum } }),
    ]);

    const ics = calculateICS({ tarefas, provas, agendamentos });

    res.json({ semanaId: semanaIdNum, ics });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const sugestaoReorganizacao = async (req, res) => {
  try {
    const { semanaId } = req.params;
    const [tarefas, provas, blocos] = await Promise.all([
      prisma.tarefa.findMany({ where: { semanaId: Number(semanaId), isComplete: false } }),
      prisma.prova.findMany({ where: { semanaId: Number(semanaId) } }),
      prisma.grayBlock.findMany({ where: { semanaId: Number(semanaId) } }),
    ]);

    const tarefasOrdenadas = tarefas
      .map(t => ({ ...t, prioridade: t.dificuldade * 2 + t.tempoEstimado }))
      .sort((a, b) => a.dataLimite - b.dataLimite || b.prioridade - a.prioridade);

    const provasOrdenadas = provas.sort((a, b) => a.dataInicio - b.dataInicio || b.difficulty - a.difficulty);

    res.json({
      semanaId: Number(semanaId),
      sugestao: {
        tarefas: tarefasOrdenadas,
        provas: provasOrdenadas,
        blocos,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { listarEventos, calcularICS, sugestaoReorganizacao };
