import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/upload";
import { SessionController } from "./controllers/session.controller";
import { HouseController } from "./controllers/house.controller";
import { DashboardController } from "./controllers/dashboard.controller";
import { ReserveController } from "./controllers/reserve.controller";

const routes = new Router();
const upload = multer(uploadConfig);

routes.post("/sessions", SessionController.store);

routes.post("/houses", upload.single("thumbnail"), HouseController.store);
routes.get("/houses", HouseController.index);
routes.put(
  "/houses/:houseId",
  upload.single("thumbnail"),
  HouseController.update
);
routes.delete("/houses", HouseController.destroy);

routes.get("/dashboard", DashboardController.show);

routes.post("/houses/:houseId/reserve", ReserveController.store);
routes.get("/reserves", ReserveController.index);
routes.delete("/reserves/cancel", ReserveController.destroy);

export default routes;
