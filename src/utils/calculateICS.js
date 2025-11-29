/**
 * Calcula o Índice de Complexidade Semanal (ICS)
 * 
 * Algoritmo: ICS = (PD × TT × TE × (1 + CX)) × UG × DS
 * 
 * PD = peso da disciplina (0.0 a N)
 * TT = tipo da tarefa (Tarefa=1, Evento=2, Prova=4)
 * TE = tempo estimado (1-10, baseado em TaskEstimate enum)
 * CX = complexidade/dificuldade (1-5, baseado em DifficultyLevel enum)
 * UG = urgência = (1 - (diasRestantes / diasTotais)) × 1.5 (quanto menor o prazo, maior a urgência)
 * DS = densidade semanal (ajustada com base no ICS total da semana)
 * 
 * DS é determinado por:
 * - ICS < 30 → DS = 1.0
 * - ICS 30-60 → DS = 1.1
 * - ICS 60-100 → DS = 1.25
 * - ICS > 100 → DS = 1.5
 */

const toNumber = value => Number(value) || 0;

/**
 * Converte enum DifficultyLevel para número (1-5)
 * ONE=1, TWO=2, THREE=3, FOUR=4, FIVE=5
 */
const difficultyToNumber = difficulty => {
  const difficultyMap = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
  if (typeof difficulty === 'string') return difficultyMap[difficulty] || 0;
  return toNumber(difficulty);
};

/**
 * Converte enum TaskEstimate para número (1-10)
 * ONE=1, TWO=2, ..., TEN=10
 */
const estimateToNumber = estimate => {
  const estimateMap = {
    ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5,
    SIX: 6, SEVEN: 7, EIGHT: 8, NINE: 9, TEN: 10
  };
  if (typeof estimate === 'string') return estimateMap[estimate] || 0;
  return toNumber(estimate);
};

/**
 * Calcula urgência (UG) baseado na data limite e data final do semestre
 * UG = (1 - (diasRestantes / diasTotais)) × 1.5
 * Quanto menor o prazo, maior a urgência
 */
const calculateUrgency = (dataLimite, semestreDataFinal) => {
  if (!dataLimite || !semestreDataFinal) return 1.0;
  
  const now = new Date();
  const deadline = new Date(dataLimite);
  const semesterEnd = new Date(semestreDataFinal);
  
  const daysRemaining = Math.max(0, (deadline - now) / (1000 * 60 * 60 * 24));
  const totalDays = (semesterEnd - now) / (1000 * 60 * 60 * 24);
  
  if (totalDays <= 0) return 1.5;
  
  const urgency = (1 - (daysRemaining / totalDays)) * 1.5;
  return Math.max(0.5, Math.min(1.5, urgency)); // Limita entre 0.5 e 1.5
};

/**
 * Calcula densidade semanal (DS) com base no ICS total
 */
const calculateDensity = icsTotal => {
  if (icsTotal < 30) return 1.0;
  if (icsTotal < 60) return 1.1;
  if (icsTotal < 100) return 1.25;
  return 1.5;
};

/**
 * Calcula ICS individual para um item (Tarefa, Prova ou Evento)
 */
const calculateItemICS = (item, taskType, pesoDisciplina, semestreDataFinal) => {
  const PD = pesoDisciplina || 1.0;
  const TT = taskType; // 1=Tarefa, 2=Evento, 4=Prova
  const TE = estimateToNumber(item.tempoEstimado ?? item.estimatedTime ?? 1);
  const CX = difficultyToNumber(item.dificuldade ?? item.difficulty ?? 1);
  const UG = calculateUrgency(item.dataLimite, semestreDataFinal);
  
  // ICS sem DS: (PD × TT × TE × (1 + CX)) × UG
  const icsWithoutDS = (PD * TT * TE * (1 + CX)) * UG;
  
  return icsWithoutDS;
};

/**
 * Calcula ICS semanal com base em tarefas, provas e eventos
 * 
 * @param {Object} params - Parâmetros da semana
 * @param {Array} params.tarefas - Array de tarefas
 * @param {Array} params.provas - Array de provas
 * @param {Array} params.eventos - Array de eventos
 * @param {Date} params.semestreDataFinal - Data final do semestre (para calcular urgência)
 * @param {Object} params.disciplinasMap - Mapa de disciplinas com seus pesos (id -> peso)
 * @returns {Object} { iCS: number, densidadeSemanal: number, detalhes: {...} }
 */
const calculateICS = ({
  tarefas = [],
  provas = [],
  eventos = [],
  semestreDataFinal,
  disciplinasMap = {}
} = {}) => {
  let totalICS = 0;

  // Calcula ICS de cada tarefa (TT = 1)
  const tarefasICS = tarefas.map(tarefa => {
    const pesoDisciplina = disciplinasMap[tarefa.disciplineId]?.peso || 1.0;
    return calculateItemICS(tarefa, 1, pesoDisciplina, semestreDataFinal);
  });

  // Calcula ICS de cada evento (TT = 2)
  const eventosICS = eventos.map(evento => {
    const pesoDisciplina = disciplinasMap[evento.disciplineId]?.peso || 1.0;
    return calculateItemICS(evento, 2, pesoDisciplina, semestreDataFinal);
  });

  // Calcula ICS de cada prova (TT = 4)
  const provasICS = provas.map(prova => {
    const pesoDisciplina = disciplinasMap[prova.disciplineId]?.peso || 1.0;
    return calculateItemICS(prova, 4, pesoDisciplina, semestreDataFinal);
  });

  // Soma todos os ICS
  totalICS = [
    ...tarefasICS,
    ...eventosICS,
    ...provasICS
  ].reduce((sum, ics) => sum + ics, 0);

  // Calcula densidade semanal com base no ICS total
  const densidadeSemanal = calculateDensity(totalICS);

  // ICS final com fator de densidade
  const iCSFinal = totalICS * densidadeSemanal;

  return {
    iCS: Number(iCSFinal.toFixed(2)),
    densidadeSemanal: Number(densidadeSemanal.toFixed(2)),
    detalhes: {
      tarefasICS: tarefasICS.map(x => Number(x.toFixed(2))),
      eventosICS: eventosICS.map(x => Number(x.toFixed(2))),
      provasICS: provasICS.map(x => Number(x.toFixed(2))),
      iCSSemDensidade: Number(totalICS.toFixed(2))
    }
  };
};

module.exports = calculateICS;
