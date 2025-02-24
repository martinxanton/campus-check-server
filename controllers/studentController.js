import { Student, Person } from "../models/index.js";

export const listStudents = async (req, res) => {
  const { faculty, career } = req.query;
  try {
    const where = {};
    if (faculty) {
      where.faculty = faculty;
    }
    if (career) {
      where.career = career;
    }
    const students = await Student.findAll({ where, include: [Person] });
    res.status(200).json({ students });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const findStudentByCod = async (req, res) => {
  const { cod } = req.params;
  try {
    const student = await Student.findOne({
      where: { cod },
    });
    if (student === null) {
      return res.status(404).json({ message: "Student not found" });
    }
    const person = await Person.findByPk(student.personId);
    res.status(200).json({ person, student });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
