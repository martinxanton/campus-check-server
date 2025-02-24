import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Student extends Model {}

  Student.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      cod: {
        comment: "Student code",
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: 8,
        },
      },
      // TODO: normalize
      faculty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      career: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Student",
    }
  );

  return Student;
};
