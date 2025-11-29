Guia rápido para inicializar e testar.

Instalar deps (na raiz do projeto)
npm install
Configurar banco
Crie .env na raiz com DATABASE_URL="mysql://user:pass@host:3306/dbname"
Opcional: para testar com SQLite rápido, mude o provider no schema.prisma para sqlite e use DATABASE_URL="file:./dev.db".
Gerar Prisma Client (corrige o erro que você viu)
Na raiz: npx prisma generate
Criar/migrar banco
Se já tem migrations: npx prisma migrate deploy
Para gerar migrations novas (dev): npx prisma migrate dev --name init
Subir backend
cd backend
node src/server.js
Endpoints úteis:
GET http://localhost:3000/semanas/1/ics
GET http://localhost:3000/recomendacoes/1
GET http://localhost:3000/dias?semanaId=1&date=2025-12-07
CRUD: /tarefas, /provas, /blocos, /disciplinas/:semesterId/attendance
Popular dados de teste (exemplos)
Criar tarefa:
curl -X POST http://localhost:3000/tarefas -H "Content-Type: application/json" -d "{\"semanaId\":1,\"nome\":\"Lista 1\",\"dataLimite\":\"2025-12-05T12:00:00Z\",\"dificuldade\":\"THREE\",\"tempoEstimado\":\"TWO\"}"
Criar prova:
curl -X POST http://localhost:3000/provas -H "Content-Type: application/json" -d "{\"semanaId\":1,\"disciplineId\":1,\"nome\":\"Prova 1\",\"dataInicio\":\"2025-12-07T12:00:00Z\",\"dataFinal\":\"2025-12-07T13:00:00Z\",\"difficulty\":\"FOUR\"}"
Testar algoritmos sem frontend
node backend/scripts/testRecommendations.js
Subir frontend (se já configurado em frontend/)
cd frontend
npm install (se ainda não)
npm run dev (ou npm start dependendo do setup)
Confirme que o front chama http://localhost:3000 ou ajuste proxy/.env.
Se o erro “@prisma/client did not initialize…” voltar:

Garanta que npx prisma generate rodou sem erro.
Verifique se schema.prisma está acessível e DATABASE_URL está configurada.
Apague node_modules/.prisma e regenere se necessário: rm -rf node_modules/.prisma && npx prisma generate.