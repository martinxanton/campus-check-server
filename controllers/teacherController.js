import { Person, Teacher } from "../models/index.js";

export const listTeachers = async (req, res) => {
  const { faculty } = req.query;
  try {
    const where = {};
    if (faculty) {
      where.faculty = faculty;
    }
    const teachers = await Teacher.findAll({ where, include: [Person] });
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const findTeacherByCod = async (req, res) => {
  const { cod } = req.params;
  try {
    const teacher = await Teacher.findOne({
      where: { cod },
    });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    const person = await Person.findByPk(teacher.id);
    return res.status(200).json({ person, teacher });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
