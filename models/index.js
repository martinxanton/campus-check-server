import sequelize from "../config/db.js";
import adminModel from "./admin.js";
import staffModel from "./staff.js";
import personModel from "./person.js";
import studentModel from "./student.js";
import teacherModel from "./teacher.js";
import guestModel from "./guest.js";
import recordModel from "./record.js";
import person from "./person.js";

const Admin = adminModel(sequelize);
const Staff = staffModel(sequelize);
const Person = personModel(sequelize);
const Student = studentModel(sequelize);
const Teacher = teacherModel(sequelize);
const Guest = guestModel(sequelize);
const Record = recordModel(sequelize);

Admin.hasMany(Staff, { foreignKey: "adminId" });
Staff.belongsTo(Admin, { foreignKey: "adminId" });

const personOptions = {
  foreignKey: { name: "personId", allowNull: false },
  onDelete: "CASCADE",
};

Person.hasOne(Student, personOptions);
Student.belongsTo(Person, personOptions);

Person.hasOne(Teacher, personOptions);
Teacher.belongsTo(Person, personOptions);

Person.hasOne(Guest, personOptions);
Guest.belongsTo(Person, personOptions);

Person.belongsToMany(Staff, {
  through: { model: Record, unique: false },
  foreignKey: { name: "personId", allowNull: false },
});
Staff.belongsToMany(Person, {
  through: { model: Record, unique: false },
  foreignKey: { name: "staffId", allowNull: false },
});

export { sequelize, Admin, Staff, Person, Student, Teacher, Guest, Record };
