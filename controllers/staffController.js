import { Op } from "sequelize";
import { Staff, Record } from "../models/index.js";

export const listStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll();
    res.status(200).json({ staff });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const listDailyRecords = async (req, res) => {
  // TODO: validate user is staff
  const staffId = req.user.id;
  try {
    const records = await Record.findAll({
      where: {
        staffId,
        createdAt: {
          [Op.gte]: new Date().setHours(0, 0, 0, 0), // Today at midnight
          [Op.lt]: new Date().setHours(23, 59, 59, 999), // Today at 11:59 PM (almost end of day)
        },
      },
    });
    res.status(200).json({ records });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const registerStaff = async (req, res) => {
  const staffInfo = { ...req.body };

  if (!staffInfo.hasOwnProperty("password")) {
    staffInfo.password = staffInfo.dni.toString();
  }

  try {
    const staff = await Staff.create({ ...staffInfo, adminId: req.user.id });
    res.status(201).json({ message: "Staff created", staff });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginStaff = async (req, res) => {
  const { user, password } = req.body;
  try {
    const staff = await Staff.findOne({ where: { user } });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    const isValid = await staff.comparePasswords(password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = staff.createJWT();
    res.status(200).json({ message: "Staff logged in", staff, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStaffPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const staff = await Staff.findByPk(req.user.id);
    const isValid = await staff.comparePasswords(oldPassword);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    staff.password = newPassword;
    await staff.save();
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAssignedGate = async (req, res) => {
  const { staffId, gate } = req.body;
  if (!staffId || !gate) {
    return res.status(400).json({ message: "Missing values" });
  }
  try {
    const staff = await Staff.findByPk(staffId);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    staff.assignedGate = gate;
    await staff.save();
    res.status(200).json({ message: "Gate assigned" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
