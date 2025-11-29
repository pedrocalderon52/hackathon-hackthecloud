const calculateICS = require('./calculateICS');

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
  const dayEnd = dayStart + 24 * 60 * 60 * 1000;
  return blocks.some(block => {
    const start = toDate(block.startDateTime);
    const end = toDate(block.endDateTime);
    if (!start || !end) return false;
    return start.getTime() < dayEnd && end.getTime() > dayStart;
  });
};

const weightTask = task => {
  const dificuldade = Number(task.dificuldade) || 0;
  const tempoEstimado = Number(task.tempoEstimado) || 0;
  return (dificuldade + tempoEstimado);
};

const findTargetDate = (deadline, currentDate, blocks = []) => {
  const deadlineDay = startOfDay(deadline);
  const minDay = startOfDay(currentDate);
  for (
    let d = new Date(deadlineDay.getTime() - 24 * 60 * 60 * 1000);
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

module.exports = generateSuggestion;
