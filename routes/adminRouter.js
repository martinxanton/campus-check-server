import auth from "../middlewares/auth.js";
import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  listAdmins,
  updateAdminPassword,
} from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.patch("/password", auth(), updateAdminPassword);
adminRouter.get("/", auth(), listAdmins);

export default adminRouter;
