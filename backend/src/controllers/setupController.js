const prisma = require('../prismaClient');

const createUser = async (req, res) => {
  try {
    const { nome, senha, email, universidade, horaInicioDia, horaFinalDia } = req.body;
    const user = await prisma.user.create({
      data: { nome, senha, email, universidade, horaInicioDia, horaFinalDia },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createSemester = async (req, res) => {
  try {
    const { userId, dataInicio, dataFinal } = req.body;
    const semester = await prisma.semester.create({
      data: { userId: Number(userId), dataInicio: new Date(dataInicio), dataFinal: new Date(dataFinal) },
    });
    res.status(201).json(semester);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createWeek = async (req, res) => {
  try {
    const { semesterId, ICS = 0, quantidadeProvas = 0 } = req.body;
    const week = await prisma.week.create({
      data: { semesterId: Number(semesterId), ICS: Number(ICS), quantidadeProvas: Number(quantidadeProvas) },
    });
    res.status(201).json(week);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createDiscipline = async (req, res) => {
  try {
    const { semesterId, nome, notas = [] } = req.body;
    const disciplina = await prisma.discipline.create({
      data: { semesterId: Number(semesterId), nome, notas },
    });
    res.status(201).json(disciplina);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createUser, createSemester, createWeek, createDiscipline };
