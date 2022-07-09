import * as dotenv from "dotenv";
import * as express from "express";
import * as morgan from "morgan";
import { router as engineRoute } from "./routes/engineRoute";
import { router as thermalRoute } from "./routes/thermalRoute";

async function main() {
  // .env file load
  dotenv.config();

  const app = express();
  const port = process.env.PORT || 5000;

  // Setup logger - morgan
  app.use(morgan("dev"));

  //Routes
  app.use(process.env.API_PREFIX + "/engine", engineRoute);
  app.use(process.env.API_PREFIX + "/thermal", thermalRoute);

  app.listen(port, () => {
    console.log(`Babybox backed listening on port ${port}`);
  });
}

main();
