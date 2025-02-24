import auth from "../middlewares/auth.js";
import { Router } from "express";
import {
  findTeacherByCod,
  listTeachers,
} from "../controllers/teacherController.js";

const teacherRouter = Router();

teacherRouter.use(auth());

teacherRouter.get("/:cod", findTeacherByCod);
teacherRouter.get("/", listTeachers);

export default teacherRouter;
