// src/controllers/tarefaController.js
const prisma = require('../prismaClient');

const createTarefa = async (req, res) => {
  try {
    const data = req.body;
    const tarefa = await prisma.tarefa.create({ data });
    res.status(201).json({ tarefa });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const tarefa = await prisma.tarefa.update({ where: { id: Number(id) }, data });
    res.json({ tarefa });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tarefa.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createTarefa, updateTarefa, deleteTarefa };
