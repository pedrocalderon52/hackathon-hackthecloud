const prisma = require('../prismaClient');

const startOfDay = date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = date => {
  const d = startOfDay(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const getDailyActivities = async (req, res) => {
  try {
    const { date, semanaId } = req.query;
    if (!date || !semanaId) {
      return res.status(400).json({ error: 'date e semanaId são obrigatórios' });
    }

    const semanaIdNum = Number(semanaId);
    const start = startOfDay(date);
    const end = endOfDay(date);

    const [tarefas, provas, eventos] = await Promise.all([
      prisma.tarefa.findMany({
        where: { semanaId: semanaIdNum, dataLimite: { gte: start, lte: end } },
        orderBy: { dataLimite: 'asc' },
      }),
      prisma.prova.findMany({
        where: {
          semanaId: semanaIdNum,
          OR: [{ dataInicio: { gte: start, lte: end } }, { dataFinal: { gte: start, lte: end } }],
        },
        orderBy: { dataInicio: 'asc' },
      }),
      prisma.evento.findMany({
        where: { semanaId: semanaIdNum, dataInicio: { gte: start, lte: end } },
        orderBy: { dataInicio: 'asc' },
      }),
    ]);

    res.json({
      date,
      semanaId: semanaIdNum,
      counts: { tarefas: tarefas.length, provas: provas.length, eventos: eventos.length },
      tarefas,
      provas,
      eventos,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getDailyActivities };
