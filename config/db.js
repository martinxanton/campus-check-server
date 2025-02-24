import { Sequelize } from "sequelize";
import { DB_URI } from "./config.js";

const sequelize = new Sequelize(DB_URI, {
  dialect: "postgres",
  dialectOptions: {
    useIPv6: false,
  },
  logging: true,
  dialectOptions: {
    timezone: "-05:00",
  },
  timezone: "-05:00",
});

// Test connection
try {
  await sequelize.authenticate();
  console.log("Database connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
  process.exit(0);
}

export default sequelize;
