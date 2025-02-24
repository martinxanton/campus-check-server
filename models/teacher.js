import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Teacher extends Model {}

  Teacher.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      cod: {
        comment: "Teacher code",
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      faculty: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Teacher",
    }
  );

  return Teacher;
};
