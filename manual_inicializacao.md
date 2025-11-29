Guia rápido para rodar o sistema

1) Instalar dependências (raiz)
- `npm install`

2) Configurar banco
- Crie `.env` na raiz com `DATABASE_URL="mysql://user:pass@host:3306/dbname"`
- Alternativa rápida: trocar provider no `schema.prisma` para `sqlite` e usar `DATABASE_URL="file:./dev.db"`

3) Gerar Prisma Client
- `npx prisma generate`

4) Criar/migrar banco
- Se já existirem migrations: `npx prisma migrate deploy`
- Para criar/aplicar em dev: `npx prisma migrate dev --name init`

5) Subir backend (porta 3000)
- `cd backend`
- `node src/server.js`

6) Endpoints úteis
- `GET /semanas/1/ics`
- `GET /recomendacoes/1`
- `GET /dias?semanaId=1&date=2025-12-07`
- CRUD: `/tarefas`, `/provas`, `/blocos`, `/disciplinas/:semesterId/attendance`

7) Popular dados de teste (exemplos)
- Criar tarefa:  
  `curl -X POST http://localhost:3000/tarefas -H "Content-Type: application/json" -d "{\"semanaId\":1,\"nome\":\"Lista 1\",\"dataLimite\":\"2025-12-05T12:00:00Z\",\"dificuldade\":\"THREE\",\"tempoEstimado\":\"TWO\"}"`
- Criar prova:  
  `curl -X POST http://localhost:3000/provas -H "Content-Type: application/json" -d "{\"semanaId\":1,\"disciplineId\":1,\"nome\":\"Prova 1\",\"dataInicio\":\"2025-12-07T12:00:00Z\",\"dataFinal\":\"2025-12-07T13:00:00Z\",\"difficulty\":\"FOUR\"}"`

8) Testar algoritmos sem frontend
- `node backend/scripts/testRecommendations.js`

9) Subir frontend (se aplicável)
- `cd frontend`
- `npm install`
- `npm run dev` (ou `npm start`)
- Aponte chamadas para `http://localhost:3000` (ajuste proxy/.env se precisar)

Se aparecer “@prisma/client did not initialize”:
- Rode `npx prisma generate`
- Confira `DATABASE_URL` e se `schema.prisma` está acessível
- Se necessário: `rm -rf node_modules/.prisma && npx prisma generate`
