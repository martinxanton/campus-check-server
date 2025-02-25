import { Sequelize } from "sequelize";
import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } from "./config.js";

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necesario para certificados autofirmados
    },
    timezone: "-05:00",
  },
  timezone: "-05:00",
});

// Test connection
try {
  console.log(DB_HOST, DB_PORT, DB_USER, DB_NAME);
  await sequelize.authenticate();
  console.log("Database connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
  process.exit(0);
}

export default sequelize;
