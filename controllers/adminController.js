import { Admin } from "../models/index.js";

export const listAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json({ admins });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json({ message: "Admin created", admin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  const { user, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { user } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const isValid = await admin.comparePasswords(password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = admin.createJWT();
    res.status(200).json({ message: "Admin logged in", admin, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAdminPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const admin = await Admin.findByPk(req.user.id);
    const isValid = await admin.comparePasswords(oldPassword);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    admin.password = newPassword;
    await admin.save();
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
