import auth from "../middlewares/auth.js";
import { Router } from "express";
import {
  registerStaff,
  loginStaff,
  listStaff,
  listDailyRecords,
  updateStaffPassword,
  updateAssignedGate,
} from "../controllers/staffController.js";

const staffRouter = Router();

staffRouter.post("/register", auth(), registerStaff);
staffRouter.post("/login", loginStaff);
staffRouter.patch("/password", auth(), updateStaffPassword);
staffRouter.patch("/gate", auth(), updateAssignedGate);
staffRouter.get("/", auth(), listStaff);
staffRouter.get("/records", auth(), listDailyRecords);

export default staffRouter;
