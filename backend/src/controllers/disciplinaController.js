const prisma = require('../prismaClient');

const listAttendance = async (req, res) => {
  try {
    const semesterId = Number(req.params.semesterId);
    const aulas = await prisma.aula.findMany({
      where: { semesterId, disciplineId: { not: null } },
      select: {
        disciplineId: true,
        status: true,
        disciplina: { select: { nome: true, id: true } },
      },
    });

    const stats = aulas.reduce((acc, aula) => {
      const key = aula.disciplineId;
      if (!acc[key]) {
        acc[key] = { disciplinaId: key, nome: aula.disciplina?.nome || 'Disciplina', presentes: 0, faltas: 0 };
      }
      if (aula.status === 'CONCLUIDA') acc[key].presentes += 1;
      if (aula.status === 'FALTA') acc[key].faltas += 1;
      return acc;
    }, {});

    const disciplinas = Object.values(stats).map(item => {
      const total = item.presentes + item.faltas;
      const attendance = total > 0 ? Number(((item.presentes / total) * 100).toFixed(1)) : 0;
      return { ...item, attendance };
    });

    res.json({ semesterId, disciplinas });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { listAttendance };
