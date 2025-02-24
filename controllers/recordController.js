import { Record } from "../models/index.js";

export const listRecords = async (req, res) => {
  const { personId, staffId, type, gate } = req.query;
  try {
    const where = {};
    if (personId) {
      where.personId = personId;
    }
    if (staffId) {
      where.staffId = staffId;
    }
    if (type) {
      where.type = type;
    }
    if (gate) {
      where.gate = gate;
    }
    const records = await Record.findAll({ where });
    res.status(200).json({ records });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createRecord = async (req, res) => {
  const staffId = req.user.id;
  const { personId, gate, type } = req.body;
  try {
    const record = await Record.create({ gate, type, staffId, personId });
    res.status(201).json({ record });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
