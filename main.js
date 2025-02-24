import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";
import { PORT } from "./config/config.js";
import dbSeeding from "./data/dbSeeding.js";
import staffRouter from "./routes/staffRouter.js";
import adminRouter from "./routes/adminRouter.js";
import personRouter from "./routes/personRouter.js";
import studentRouter from "./routes/studentRouter.js";
import teacherRouter from "./routes/teacherRouter.js";
import recordRouter from "./routes/recordRouter.js";

// change the default toJSON method of Date
Date.prototype.toJSON = function () {
  return this.toLocaleString();
};

// Create an Express application
const app = express();

// Server setup
const init = async () => {
  await sequelize.sync();
  await dbSeeding();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
};

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// built client
app.use("/", express.static("public"));

app.get("/admin/reset-database", (req, res) =>
  sequelize.sync({ force: true }).then(async () => {
    await dbSeeding();
    const msg = "Database reseted successfully.";
    console.log(msg);
    res.send(msg);
  })
);

// API
const API_PREFIX = "/api/v1";
app.use(`${API_PREFIX}/staff`, staffRouter);
app.use(`${API_PREFIX}/admin`, adminRouter);
app.use(`${API_PREFIX}/people`, personRouter);
app.use(`${API_PREFIX}/student`, studentRouter);
app.use(`${API_PREFIX}/teacher`, teacherRouter);
app.use(`${API_PREFIX}/record`, recordRouter);

// Catch-all route for non-existent paths
app.get("*", (req, res) => {
  // Render a 404 "Not Found" page
  res.status(404).sendFile("./404.html", { root: "./public" });
});

// Start the server
init();
