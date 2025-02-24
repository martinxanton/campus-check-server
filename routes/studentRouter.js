import auth from "../middlewares/auth.js";
import { Router } from "express";
import {
  findStudentByCod,
  listStudents,
} from "../controllers/studentController.js";

const studentRouter = Router();

studentRouter.use(auth());

studentRouter.get("/:cod", findStudentByCod);
studentRouter.get("/", listStudents);

export default studentRouter;
