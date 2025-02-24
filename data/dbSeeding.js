import { promises as fs } from "fs";
import { Admin, Staff, Person } from "../models/index.js";

// Lee el archivo JSON
async function readJSON(filePath) {
  try {
    const rawData = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(rawData);
    return data;
  } catch (error) {
    console.error("Error reading the file:", error);
  }
}

// TODO: validate info (not null)
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

async function dbSeeding() {
  console.log("\n\n====Initializing DB Seeding====\n");
  try {
    const { admin } = await readJSON("./data/admin.json");
    const { staff } = await readJSON("./data/staff.json");

    // people.json contienes datos de invitados, profesores y estudiantes
    const { people } = await readJSON("./data/people.json");

    const adm = await Admin.create(admin);
    console.log("Loading Admin Complete\n");

    for (const stf of staff) {
      if (!stf.hasOwnProperty("password")) {
        stf.password = stf.dni.toString();
      }
      await Staff.create({ ...stf, adminId: adm.id });
    }
    console.log("Loading Staff Complete\n");

    for (const person of people) {
      await savePerson(person);
    }
    console.log("Loading People Complete");

    console.log("\n====DB Seeding Complete====\n\n");
  } catch (error) {
    console.error("Error saving the person:", error);
  }
}

// necesita que se hayan creado las tablas antes de ejecutar el seeding
export default async () => {
  try {
    // toma como referencia la cantidad de registros en la tabla Admin
    const adminCount = await Admin.count();
    if (adminCount === 0) {
      await dbSeeding();
    } else {
      console.log("The database has already been seeded.");
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};
