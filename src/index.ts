import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import * as morgan from "morgan";

import { router as engineRoute } from "./routes/engineRoute";
import { router as thermalRoute } from "./routes/thermalRoute";
import { router as unitsRoute } from "./routes/unitsRoute";

async function main() {
  // .env file load
  dotenv.config();

  const app = express();
  const port = process.env.PORT || 5000;

  // Setup logger - morgan
  app.use(morgan("dev"));

  // Allow cors
  app.use(cors());

  // Parse JSON in POST requests
  app.use(express.json());

  // Status route
  app.get(process.env.API_PREFIX + "/status", (req, res) => {
    res.status(200).send({
      msg: "Alive.",
      version: process.env.VERSION || "Unknown",
      engineIP: process.env.ENGINE_UNIT_IP || undefined,
      thermalIP: process.env.THERMAL_UNIT_IP || undefined,
    });
  });

  //Routes
  app.use(process.env.API_PREFIX + "/units", unitsRoute);
  app.use(process.env.API_PREFIX + "/engine", engineRoute);
  app.use(process.env.API_PREFIX + "/thermal", thermalRoute);

  app.listen(port, () => {
    console.log(`Babybox backend listening on port ${port}`);
  });
}

main();
