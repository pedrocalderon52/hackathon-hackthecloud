// src/controllers/blocoController.js
const prisma = require('../prismaClient');

const createBloco = async (req, res) => {
  try {
    const data = req.body;
    const bloco = await prisma.grayBlock.create({ data });
    res.status(201).json({ bloco });
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

const deleteBloco = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.grayBlock.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createBloco, updateBloco, deleteBloco };
