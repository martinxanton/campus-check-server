import { Sequelize } from "sequelize";
import { DB_URI } from "./config.js";

const sequelize = new Sequelize("postgresql://postgres:Martin1614*@db.imwwzcgekipmernuvcvy.supabase.co:5432/postgres", {
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
  await sequelize.authenticate();
  console.log("Database connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
  process.exit(0);
}

export default sequelize;
