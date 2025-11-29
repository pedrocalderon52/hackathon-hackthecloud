const calculateICS = require('./calculateICS');

const DAY_MS = 24 * 60 * 60 * 1000;

const toDate = value => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

const startOfDay = date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const isDayBlocked = (day, blocks = []) => {
  const dayStart = startOfDay(day).getTime();
  const dayEnd = dayStart + DAY_MS;
  return blocks.some(block => {
    const start = toDate(block.startDateTime);
    const end = toDate(block.endDateTime);
    if (!start || !end) return false;
    return start.getTime() < dayEnd && end.getTime() > dayStart;
  });
};

const weightTask = task => {
  const dificuldade = Number(task.dificuldade ?? task.difficulty) || 0;
  const tempoEstimado = Number(task.tempoEstimado ?? task.estimatedTime) || 0;
  return dificuldade + tempoEstimado;
};

const findTargetDate = (deadline, currentDate, blocks = []) => {
  const deadlineDay = startOfDay(deadline);
  const minDay = startOfDay(currentDate);
  for (
    let d = new Date(deadlineDay.getTime() - DAY_MS);
    d.getTime() >= minDay.getTime();
    d.setDate(d.getDate() - 1)
  ) {
    if (!isDayBlocked(d, blocks)) {
      return new Date(d);
    }
  }
  return null;
};

const generateSuggestion = ({ tasks = [], blocks = [], dataAtual = new Date() } = {}) => {
  const now = startOfDay(dataAtual);
  const ordered = [...tasks]
    .filter(t => {
      const deadline = toDate(t.dataLimite);
      return deadline && startOfDay(deadline).getTime() >= now.getTime();
    })
    .sort((a, b) => weightTask(b) - weightTask(a));

  const task = ordered[0];
  if (!task) return null;

  const deadline = toDate(task.dataLimite);
  if (!deadline) return null;

  const targetDate = findTargetDate(deadline, now, blocks);
  if (!targetDate) return null;

  const oldICS = calculateICS({ tarefas: tasks });
  const updatedTasks = tasks.map(t =>
    t.id === task.id ? { ...t, dataLimite: targetDate.toISOString() } : t
  );
  const newICS = calculateICS({ tarefas: updatedTasks });

  return {
    type: 'move',
    taskId: task.id,
    from: task.dataLimite,
    to: targetDate.toISOString(),
    deltaICS: oldICS - newICS,
  };
};

const buildRecommendations = ({ tasks = [], provas = [], dataAtual = new Date() } = {}) => {
  const now = startOfDay(dataAtual);
  const inNextDays = (dateVal, days) => {
    const d = toDate(dateVal);
    if (!d) return false;
    const diffDays = (startOfDay(d).getTime() - now.getTime()) / DAY_MS;
    return diffDays >= 0 && diffDays <= days;
  };

  const upcomingTasks = tasks.filter(t => !t.isComplete && inNextDays(t.dataLimite, 7));
  const upcomingProvas = provas.filter(p => inNextDays(p.dataInicio || p.dataFinal, 7));

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.isComplete).length;
  const completion = totalTasks ? doneTasks / totalTasks : 0;

  const ics = calculateICS({ tarefas: tasks, provas });

  const recommendations = [];

  if (upcomingTasks.length >= 3 || upcomingProvas.length >= 2) {
    recommendations.push({
      id: 'alta',
      priority: 'alta',
      tone: 'warning',
      message: `Voce tem ${upcomingTasks.length} entregas e ${upcomingProvas.length} provas nos proximos 7 dias. Considere adiantar algumas tarefas.`,
    });
  }

  if (recommendations.length === 0 && ics >= 15 && ics <= 45) {
    recommendations.push({
      id: 'media',
      priority: 'media',
      tone: 'info',
      message: 'Sua carga esta equilibrada esta semana. Bom momento para revisar conteudos anteriores.',
    });
  }

  if (completion >= 0.85) {
    recommendations.push({
      id: 'baixa',
      priority: 'baixa',
      tone: 'success',
      message: `Voce completou ${(completion * 100).toFixed(0)}% das tarefas desta semana. Continue assim!`,
    });
  }

  if (!recommendations.length) {
    recommendations.push({
      id: 'default',
      priority: 'media',
      tone: 'info',
      message: 'Sua semana esta sob controle. Mantenha o ritmo e revise tarefas de longo prazo.',
    });
  }

  return recommendations;
};

module.exports = { generateSuggestion, buildRecommendations, default: generateSuggestion };
