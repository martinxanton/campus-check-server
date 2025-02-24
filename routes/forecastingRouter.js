import auth from "../middlewares/auth.js";
import { Router } from "express";
import {
  trainModel,
  predictNextDay,
} from "../controllers/forecastingController.js";

const forecastingRouter = Router();

forecastingRouter.use(auth());

forecastingRouter.get("/train", trainModel);
forecastingRouter.get("/predict", predictNextDay);

export default forecastingRouter;
