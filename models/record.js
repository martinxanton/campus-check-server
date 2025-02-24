import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Record extends Model {}

  Record.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM("in", "out"),
        allowNull: false,
      },
      gate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Record",
      timestamps: true,
    }
  );

  return Record;
};
