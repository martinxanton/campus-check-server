import auth from "../middlewares/auth.js";
import { Router } from "express";
import { createRecord, listRecords } from "../controllers/recordController.js";

const recordRouter = Router();

recordRouter.use(auth());

recordRouter.post("/", createRecord);
recordRouter.get("/", listRecords);

export default recordRouter;
