import { Sequelize } from "sequelize";
import { DB_URI } from "./config.js";

const sequelize = new Sequelize(DB_URI, {
  dialect: "postgres",
  dialectOptions: {
    application_name: "myapp", // Forzar IPv4
    timezone: "-05:00",
  },
  timezone: "-05:00",
});

// Test connection
try {
  sequelize.authenticate();
  console.log("Database connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
  process.exit(0);
}

export default sequelize;
