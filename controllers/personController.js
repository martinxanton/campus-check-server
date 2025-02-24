import { Person, Student, Teacher, Guest } from "../models/index.js";

export const listPeople = async (req, res) => {
  const { type } = req.query;
  try {
    const where = {};
    if (type) {
      where.type = type;
    }
    const people = await Person.findAll({ where });
    res.status(200).json({ people });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const findPersonByDNI = async (req, res) => {
  const { dni } = req.params;
  try {
    const person = await Person.findOne({
      where: { dni },
      include: [Student, Teacher, Guest],
    });
    if (person === null) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(200).json({ person });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

async function savePerson(info) {
  const { type, dni, firstName, lastName, cod, faculty, career, image } = info;
  const person = await Person.create({ type, dni, firstName, lastName, image });
  switch (type) {
    case "student":
      await person.createStudent({
        cod,
        faculty,
        career,
      });
      break;
    case "teacher":
      await person.createTeacher({
        cod,
        faculty,
      });
      break;
    default:
      await person.createGuest();
      break;
  }
}

export const createPerson = async (req, res) => {
  const info = { ...req.body };
  try {
    await savePerson(info);
    res.status(201).json({ message: "Created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createPeopleBulk = async (req, res) => {
  const { people } = req.body;
  try {
    for (const person of people) {
      await savePerson(person);
    }
    res.status(201).json({ message: "Created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
