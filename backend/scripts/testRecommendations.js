const path = require('path');
const { buildRecommendations, generateSuggestion } = require('../src/utils/generateSuggestion');

// Dados de exemplo para testar os algoritmos sem o frontend
const tasks = [
  { id: 1, nome: 'Resumo cap. 3', dificuldade: 3, tempoEstimado: 2, dataLimite: '2025-12-02', isComplete: false },
  { id: 2, nome: 'Lista 5', dificuldade: 2, tempoEstimado: 1, dataLimite: '2025-12-05', isComplete: true },
  { id: 3, nome: 'Projeto sprint', dificuldade: 5, tempoEstimado: 3, dataLimite: '2025-12-04', isComplete: false },
];

const provas = [
  { id: 10, difficulty: 4, dataInicio: '2025-12-03' },
  { id: 11, difficulty: 2, dataInicio: '2025-12-08' },
];

const blocks = [
  { startDateTime: '2025-12-01T09:00:00', endDateTime: '2025-12-01T18:00:00' },
];

const dataAtual = '2025-12-01';

const recommendations = buildRecommendations({ tasks, provas, dataAtual });
const moveSuggestion = generateSuggestion({ tasks, blocks, dataAtual });

console.log('Arquivo de teste:', path.basename(__filename));
console.log('Recommendations:', recommendations);
console.log('Move suggestion:', moveSuggestion);
