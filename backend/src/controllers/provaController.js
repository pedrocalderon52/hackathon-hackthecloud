// src/controllers/provaController.js
const prisma = require('../prismaClient');

const createProva = async (req, res) => {
  try {
    const data = req.body;
    const prova = await prisma.prova.create({ data });
    res.status(201).json({ prova });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const readProvas = async (req, res) => {
  try {
    const provas = await prisma.prova.findMany({ orderBy: { dataInicio: 'asc' } });
    res.json({ provas });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const readProva = async (req, res) => {
  try {
    const { id } = req.params;
    const prova = await prisma.prova.findUnique({ where: { id: Number(id) } });
    if (!prova) return res.status(404).json({ error: 'Prova não encontrada' });
    res.json({ prova });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateProva = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const prova = await prisma.prova.update({ where: { id: Number(id) }, data });
    res.json({ prova });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteProva = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.prova.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createProva, readProvas, readProva, updateProva, deleteProva };
