import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Guest extends Model {}

  Guest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Guest",
    }
  );

  return Guest;
};
