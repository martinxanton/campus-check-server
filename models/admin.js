import bcrypt from "bcrypt";
import { DataTypes, Model } from "sequelize";
import { getHashedPassword, getJWT } from "../utils/utils.js";

export default (sequelize) => {
  class Admin extends Model {
    // Compare passwords
    comparePasswords = (pwd) => bcrypt.compare(pwd, this.password);

    // Create the JWT token
    createJWT = () => getJWT(this.id, "admin");
  }

  Admin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
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
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          len: [5, 10],
          isNumeric: true,
        },
      },
      user: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );

  // Hash the password before saving
  Admin.beforeSave(async (instance, opt) => {
    if (instance.changed("password")) {
      instance.password = await getHashedPassword(instance.password);
    }
  });

  return Admin;
};
