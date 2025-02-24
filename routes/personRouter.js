import auth from "../middlewares/auth.js";
import { Router } from "express";
import {
  listPeople,
  findPersonByDNI,
  createPerson,
  createPeopleBulk,
} from "../controllers/personController.js";

const personRouter = Router();

personRouter.use(auth());

personRouter.post("/", createPerson);
personRouter.post("/bulk", createPeopleBulk);
personRouter.get("/", listPeople);
personRouter.get("/:dni", findPersonByDNI);

export default personRouter;
