# 🧠 KYA — Know Your Activities (3rd PLACE HACKATHON WINNER)

> Sistema inteligente de gestão acadêmica com reorganização automática baseada em carga semanal (ICS).

KYA é uma plataforma web focada em **organização acadêmica inteligente**, que monitora tarefas, provas, rotinas e carga semanal, sugerindo reorganizações automáticas para manter a agenda equilibrada e eficiente.

O objetivo central do sistema é simples:

> 📌 **Manter a agenda o mais vazia e organizada possível, reduzindo sobrecarga e antecipando atividades.**

---

## 🚀 Problema

Estudantes enfrentam:

* Sobrecarga semanal imprevisível
* Acúmulo de tarefas próximo a provas
* Falta de visão real da carga semanal
* Dificuldade em priorizar o que realmente importa

KYA resolve isso com um **Índice de Carga Semanal (ICS)** e um algoritmo de reorganização inteligente.

---

# 🏗️ Arquitetura Conceitual

## 🔐 Autenticação

* Registro com:

  * Nome
  * Email
  * Senha
* Senha obrigatória:

  * Mínimo 10 caracteres
  * Letra maiúscula
  * Letra minúscula
  * Número
  * Caractere especial
* Armazenamento com **hash**
* (Futuro) Autenticação em dois fatores (2FA)

---

# 📊 Estrutura do Sistema

## 👤 Usuário

* Nome
* Email
* Senha (hash)
* Data do semestre
* Universidade

---

## 📚 Disciplina

* Nome
* Peso (créditos) — opcional
* Lista de aulas (dia da semana)
* Notas
* Monitoramento de faltas

---

## 📆 Eventos

Tipos:

* Aula
* Prova
* Atividade
* Seminário
* Encontro
* Outro (peso customizável)
* Bloco Cinza (indisponibilidade)

Campos gerais:

* Nome
* Data início
* Data término
* Dificuldade (⭐)
* Tempo estimado (1–10)
* Disciplina (opcional)
* Observação
* Status (pendente, concluída, falta, suspensa)

---

## 📝 Tarefa

* Nome
* Data de entrega
* Dificuldade (estrelas)
* Tempo estimado
* Disciplina (opcional)
* Observação
* Completo (boolean)

---

## 🧪 Prova

* Nome
* Data início
* Data término
* Dificuldade
* Disciplina
* Observação

---

## ⏰ Rotina

* Início do dia
* Final do dia
* Intervalo de sono
* Horários fixos (trabalho, academia, aulas)

---

# 📈 ICS — Índice de Carga Semanal

O sistema calcula automaticamente a densidade da semana.

### Classificação da carga:

* Leve
* Média
* Alta
* Muito Alta

Usuário pode definir intervalos personalizados de ICS.

---

# 🧮 Fórmula de Priorização

O peso real de cada atividade é calculado por:

```
IS = (PD × TT × TE × (1 + CX)) × UG × DS × CT
```

Onde:

* **PD** = Peso da disciplina
* **TT** = Tipo da tarefa
* **TE** = Tempo estimado
* **CX** = Complexidade
* **UG** = Urgência (aumenta com o passar dos dias)
* **DS** = Densidade semanal
* **CT** = Contexto acadêmico

---

# 🤖 Algoritmo de Reorganização (MVP)

O sistema:

* Atualiza diariamente
* Atualiza sempre que o usuário adiciona/remove algo
* Detecta semanas sobrecarregadas
* Sugere mover tarefas:

  * Para antes (priorizado)
  * Para depois (se necessário)
* Sugere adiantar atividades
* Detecta atividades próximas de provas

  * Sugere integrá-las ao estudo da prova

### Objetivo do algoritmo:

> Manter a agenda sempre com espaço livre.

---

# 📦 MVP

Funcionalidades incluídas:

* Registro e login
* CRUD de tarefas
* CRUD de provas
* CRUD de eventos
* Cálculo de ICS
* Sugestão de mover tarefas entre semanas
* Atualização automática diária
* Segurança básica (hash de senha)

---

# 🔮 Escalabilidade (Futuro)

* Acessibilidade
* Sugestão de quebrar tarefas em sessões menores
* Ajuste de urgência baseado em:

  * Desempenho na disciplina
  * Créditos da disciplina
* Lógica para múltiplas faculdades simultâneas
* Gestão de conexões acadêmicas (grafo de networking)
* Monitoramento avançado de notas e faltas
* Sistema social tipo:

  ```
  Type anything, @mention anyone
  ```

---

# 🖥️ Interface Web

### Páginas principais:

* Registro
* Login
* Dashboard
* Semana atual (ICS visível)
* Detalhe do dia
* Detalhe da disciplina
* Detalhe da tarefa

---

# 🎯 Diferencial Estratégico

KYA não é apenas um planner.

Ele:

* Mede carga real
* Aprende com comportamento
* Ajusta urgência dinamicamente
* Prioriza disciplina com maior peso
* Integra atividades com provas
* Recomenda antecipação constante

---

# 🧠 Filosofia do Produto

> Know Your Activities.

Você não controla seu tempo se não entende o peso real do que faz.

---

# 🛡 Segurança

* Senhas com hash
* Validação forte de senha
* (Futuro) 2FA
* Separação lógica de semestre para evitar conflitos

---

# 🧩 Estrutura do Projeto (Sugestão)

```
/backend
    /auth
    /disciplina
    /tarefa
    /evento
    /ics
    /reorganizacao

/frontend
    /pages
    /components
    /services

/docs
    arquitetura.md
    algoritmo.md
```

---

# 🏁 Objetivo Final

Construir um sistema que:

* Reduz estresse acadêmico
* Melhora desempenho
* Otimiza tempo
* Ensina organização baseada em dados

# Participantes: 
- Pedro Calderón 
- Lucas Alberto Borges
- Lucas Moura
- Isaac Lovisi
- Ângelo Keiller
- Miguel Allievi

Qual o próximo passo estratégico?
