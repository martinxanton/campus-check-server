import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Person extends Model {}

  Person.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["student", "teacher", "guest"],
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: 8,
          isNumeric: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      modelName: "Person",
      indexes: [
        {
          fields: ["dni"],
        },
      ],
    }
  );

  return Person;
};
