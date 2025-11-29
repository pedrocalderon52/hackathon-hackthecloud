-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "universidade" TEXT NOT NULL,
    "horaInicioDia" TEXT NOT NULL,
    "horaFinalDia" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataFinal" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Semester_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Discipline" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semesterId" INTEGER NOT NULL,
    "peso" REAL NOT NULL DEFAULT 1.0,
    "nome" TEXT NOT NULL,
    "notas" JSONB NOT NULL,
    CONSTRAINT "Discipline_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Week" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semesterId" INTEGER NOT NULL,
    "iCS" REAL NOT NULL DEFAULT 0.0,
    "densidadeSemanal" REAL NOT NULL DEFAULT 1.0,
    "quantidadeProvas" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Week_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semanaId" INTEGER NOT NULL,
    "disciplineId" INTEGER,
    "nome" TEXT NOT NULL,
    "dataLimite" DATETIME NOT NULL,
    "dificuldade" TEXT NOT NULL,
    "tempoEstimado" TEXT NOT NULL,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "iCS" REAL NOT NULL DEFAULT 0.0,
    "observacao" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Tarefa_semanaId_fkey" FOREIGN KEY ("semanaId") REFERENCES "Week" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Tarefa_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Prova" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semanaId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataFinal" DATETIME NOT NULL,
    "difficulty" TEXT NOT NULL,
    "iCS" REAL NOT NULL DEFAULT 0.0,
    "observacao" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Prova_semanaId_fkey" FOREIGN KEY ("semanaId") REFERENCES "Week" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Prova_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semanaId" INTEGER NOT NULL,
    "disciplineId" INTEGER,
    "nome" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataFinal" DATETIME NOT NULL,
    "dificuldade" TEXT NOT NULL,
    "iCS" REAL NOT NULL DEFAULT 0.0,
    "observacao" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Evento_semanaId_fkey" FOREIGN KEY ("semanaId") REFERENCES "Week" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Evento_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Aula" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semesterId" INTEGER NOT NULL,
    "disciplineId" INTEGER,
    "name" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataFinal" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "observacao" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Aula_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Aula_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GrayBlock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semanaId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "startDateTime" DATETIME NOT NULL,
    "endDateTime" DATETIME NOT NULL,
    "observacao" TEXT,
    CONSTRAINT "GrayBlock_semanaId_fkey" FOREIGN KEY ("semanaId") REFERENCES "Week" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Discipline_semesterId_idx" ON "Discipline"("semesterId");

-- CreateIndex
CREATE INDEX "Week_semesterId_idx" ON "Week"("semesterId");

-- CreateIndex
CREATE INDEX "Tarefa_semanaId_idx" ON "Tarefa"("semanaId");

-- CreateIndex
CREATE INDEX "Tarefa_disciplineId_idx" ON "Tarefa"("disciplineId");

-- CreateIndex
CREATE INDEX "Prova_semanaId_idx" ON "Prova"("semanaId");

-- CreateIndex
CREATE INDEX "Prova_disciplineId_idx" ON "Prova"("disciplineId");

-- CreateIndex
CREATE INDEX "Evento_semanaId_idx" ON "Evento"("semanaId");

-- CreateIndex
CREATE INDEX "Evento_disciplineId_idx" ON "Evento"("disciplineId");

-- CreateIndex
CREATE INDEX "Aula_semesterId_idx" ON "Aula"("semesterId");

-- CreateIndex
CREATE INDEX "Aula_disciplineId_idx" ON "Aula"("disciplineId");

-- CreateIndex
CREATE INDEX "GrayBlock_semanaId_idx" ON "GrayBlock"("semanaId");
