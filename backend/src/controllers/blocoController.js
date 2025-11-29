// src/controllers/blocoController.js
const prisma = require('../prismaClient');

const createBloco = async (req, res) => {
  try {
    const { semanaId, name, bloco, startDateTime, endDateTime, observacao } = req.body;
    const payload = {
      semanaId: Number(semanaId),
      name: name || bloco,
      startDateTime,
      endDateTime,
      observacao,
    };
    if (!payload.name) {
      return res.status(400).json({ error: 'Campo name (ou bloco) é obrigatório' });
    }
    const blocoCriado = await prisma.grayBlock.create({ data: payload });
    res.status(201).json({ bloco: blocoCriado });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateBloco = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const bloco = await prisma.grayBlock.update({ where: { id: Number(id) }, data });
    res.json({ bloco });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const readBlocos = async (req, res) => {
  try {
    const blocos = await prisma.grayBlock.findMany({ orderBy: { startDateTime: 'asc' } });
    res.json({ blocos });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const readBloco = async (req, res) => {
  try {
    const { id } = req.params;
    const bloco = await prisma.grayBlock.findUnique({ where: { id: Number(id) } });
    if (!bloco) return res.status(404).json({ error: 'Bloco não encontrado' });
    res.json({ bloco });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteBloco = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.grayBlock.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createBloco, readBlocos, readBloco, updateBloco, deleteBloco };
